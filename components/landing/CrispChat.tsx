"use client"

import { useEffect } from "react"
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("8ee852cd-4f73-4353-b779-9a41138f82ac")
    } , [])

    return null;
}