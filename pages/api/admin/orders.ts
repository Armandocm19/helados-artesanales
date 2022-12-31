

import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IOrder } from '../../../interfaces'
import { Order } from '../../../models';

type Data = 
| { message: string }
| IOrder[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ){
        case 'GET':
            return getOrders( res, req );
    }

}

const getOrders = async (res: NextApiResponse<Data>, req: NextApiRequest) => {
    
    await db.connect();

    const orders = await Order.find()
                        .sort({ createdAt: 'desc' })
                        .lean();

    await db.disconnect();

    return res.status(200).json( orders );

}
