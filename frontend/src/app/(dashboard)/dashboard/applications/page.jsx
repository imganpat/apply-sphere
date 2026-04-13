"use client"

import DataTable from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

export default function Page() {
    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-1 flex-col'>
                    <h3 className='text-3xl font-bold'>
                        Applicatons
                    </h3>
                    <p>Manage and track all your job applications</p>
                </div>
                <div>
                    <Button>
                        <Plus />
                        Add application
                    </Button>
                </div>
            </div>
            <div>
                <DataTable />
            </div>
        </div>
    )
}
