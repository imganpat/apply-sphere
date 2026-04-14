"use client"

import React, { useState } from 'react'
import DataTable from '@/components/DataTable'
import ApplicationModal from '@/components/ApplicationModal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useApplicationModel } from '@/hooks/useApplicationModel'

export default function Page() {
    const { open, application, handleAdd, handleEdit, handleOpenChange } = useApplicationModel();
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
                    <Button onClick={handleAdd}>
                        <Plus />
                        Add application
                    </Button>
                </div>
            </div>
            <div>
                <DataTable onEdit={handleEdit} />
            </div>
            <ApplicationModal open={open} onOpenChange={handleOpenChange} application={application} />
        </div>
    )
}
