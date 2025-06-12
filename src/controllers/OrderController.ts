import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import generateAccessToken from '../utils/paypal'
import Tour from '../models/Tour.model'
class OrderController {
  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { tours, userId } = req.body
    try {
      const accessToken = await generateAccessToken()

      // Fetch tour details from DB
      const tourRecords = await Tour.findAll({
        where: {
          id: tours.map((t: any) => t.tourId),
        },
      })

      if (tourRecords.length === 0) {
        res.status(404).json({ message: 'Tours not found' })
      }

      // Build purchase_units for PayPal
      const purchase_units = tourRecords.map((tour) => {
        const selectedTour = tours.find((t: any) => t.tourId === tour.id)
        const quantity = selectedTour?.quantity || 1
        const price = parseFloat(tour.price?.toString() || '0')
        const total = (price * quantity).toFixed(2)

        return {
          amount: {
            currency_code: 'USD',
            value: total,
          },
          custom_id: tour.id,
          description: tour.title,
        }
      })

      // Calculate total amount for entire order
      const totalAmount = purchase_units.reduce((sum, unit) => {
        return sum + parseFloat(unit.amount.value)
      }, 0)

      const response = await axios.post(
        `${process.env.PAYPAL_API}/v2/checkout/orders`,
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: totalAmount.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: totalAmount.toFixed(2),
                  },
                },
              },
              items: purchase_units.map((unit) => ({
                name: unit.description,
                unit_amount: {
                  currency_code: 'USD',
                  value: unit.amount.value,
                },
                quantity: '1', // Update if you want to support multiple quantities
                category: 'DIGITAL_GOODS',
              })),
              custom_id: userId, // can also be orderId
            },
          ],
          application_context: {
            return_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      res.json(response.data)
    } catch (error) {
      next(error)
    }
  }
  captureOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { orderID } = req.body

    if (!orderID) {
      res.status(400).json({ message: 'Missing orderID' })
    }

    try {
      const accessToken = await generateAccessToken()

      // Capture the order
      const captureResponse = await axios.post(
        `${process.env.PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      const data = captureResponse.data

      // OPTIONAL: Save transaction to database
      const capture = data.purchase_units?.[0]?.payments?.captures?.[0]
      // if (capture) {
      //   await Transaction.create({
      //     orderId: data.id,
      //     paymentId: capture.id,
      //     status: capture.status,
      //     amount: capture.amount.value,
      //     currency: capture.amount.currency_code,
      //     payerEmail: data.payer.email_address,
      //     payerName: `${data.payer.name.given_name} ${data.payer.name.surname}`,
      //   })
      // }

      res.status(200).json({ message: 'Payment captured successfully', data })
    } catch (error: any) {
      console.error(
        'Capture Order Error:',
        error.response?.data || error.message,
      )
      res.status(500).json({ message: 'Error capturing PayPal order' })
    }
  }
}
export default OrderController
