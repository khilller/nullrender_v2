import { auth} from '@clerk/nextjs';

import prismadb from './prismadb';
import { MAX_FREE_COUNTS } from '@/constant';

export const incrementApiLimit = async () => {
    const { userId } = auth();

    if (!userId) return;

    const userLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (userLimit) {
     await prismadb.userApiLimit.update({
        where: { userId: userId},
        data: { count: userLimit.count + 1 }
     })
    } else {
        await prismadb.userApiLimit.create({
            data:{userId: userId, count: 1}
        })
    }
}

export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) return;

    const userLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    if (!userLimit || userLimit.count < MAX_FREE_COUNTS) {
        return true
    } else {
        return false;
    }

}

export const getApiLimitCount = async () => {
    const { userId } = auth();

    if (!userId) return 0;

    const userLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId

        }
    });

    if (!userLimit) {
        return 0;
    }

    return userLimit.count;

}