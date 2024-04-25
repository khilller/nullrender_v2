import { MAX_FREE_COUNTS } from '@/constant';

// get the urer profile or add if it does not exist

export async function getProfile() {
    const res = await fetch('/api/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });
    const data = await res.json();
    console.log(data);
    return data.profile;
}

//get the credit count

export async function checkFreeCredits() {
    const res = await fetch('/api/freeCredit', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });
    const freeCredit = await res.json();
    console.log(freeCredit);

    if (!freeCredit || freeCredit < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }
}