import { NextResponse } from 'next/server';
import axios from 'axios';

interface ShipmentData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
  paymentMethod: string;
}

const createShipment = async (shipmentData: ShipmentData) => {
  const { fullName, email, address, city, state, postalCode, phoneNumber } = shipmentData;

  try {
    const response = await axios.post(
      'https://api.shipengine.com/v1/shipments',
      {
        carrier_id: 'your_carrier_id_here', // ShipEngine Carrier ID
        service_code: 'your_service_code_here', // Service like Ground, Express, etc.
        shipment: {
          ship_to: {
            name: fullName,
            email,
            address_line1: address,
            city: city,
            state: state,
            postal_code: postalCode,
            country: 'US', // Adjust this dynamically
            phone: phoneNumber,
          },
          ship_from: {
            name: 'Your Business Name',
            address_line1: 'Your Address',
            city: 'Your City',
            state: 'Your State',
            postal_code: 'Your Postal Code',
            country: 'Your Country',
            phone: 'Your Phone Number',
          },
          packages: [
            {
              weight: { value: 1, unit: 'ounce' },
              dimensions: {
                length: 12,
                width: 8,
                height: 4,
                unit: 'inch',
              },
            },
          ],
        },
      },
      {
        headers: {
          'API-Key': process.env.SHIPENGINE_API_KEY!, // Your ShipEngine API key
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating shipment:', error);
    throw new Error('Error creating shipment');
  }
};

// API Route to handle POST requests
export async function POST(request: Request) {
  try {
    const shipmentData: ShipmentData = await request.json();
    const shipmentResponse = await createShipment(shipmentData);

    const trackingInfo = {
      trackingNumber: shipmentResponse.tracking_number,
      trackingUrl: shipmentResponse.tracking_url,
      status: 'Shipment Created',
    };

    return NextResponse.json(trackingInfo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create shipment' }, { status: 500 });
  }
}
