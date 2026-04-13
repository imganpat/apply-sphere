"use client"

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Card } from './ui/card'
import { getJobs } from '@/lib/api';
import { Button } from './ui/button';
import { Edit2, ExternalLink, MapPin, Search, Trash2 } from 'lucide-react';
import { StatusBadge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function DataTable() {
    const [filteredApplications, setFilteredApplications] = useState([]);

    const getApplications = async () => {
        setFilteredApplications(await getJobs());
    }

    useEffect(() => {
        getApplications();
    }, [])
    return (<>

        <div className="flex flex-col sm:flex-row gap-4 my-5">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search by company or role..."
                    className="pl-10"
                />
            </div>
            <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <Card className="w-full p-0">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-900/50 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase TableRowacking-wider">
                            <TableHead className="px-6 py-4 min-w-[180px]">Company</TableHead>
                            <TableHead className="px-6 py-4 min-w-[180px]">Role & Location</TableHead>
                            <TableHead className="px-6 py-4">Salary</TableHead>
                            <TableHead className="px-6 py-4">Status</TableHead>
                            <TableHead className="px-6 py-4">Date Applied</TableHead>
                            <TableHead className="px-6 py-4 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {filteredApplications.length > 0 ? (
                            filteredApplications.map(app => (
                                <TableRow key={app.id} className={"group"}>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-indigo-600 shrink-0">
                                                {app.company_name[0]}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-lg text-gray-900 dark:text-white truncate">{app.company_name}</p>
                                                {true && (
                                                    <a href={app.link} target="_blank" rel="noreferrer" className="text-xs text-indigo-500 flex items-center gap-1 hover:underline">
                                                        Website <ExternalLink size={10} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{app.job_title}</p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <MapPin size={12} />
                                            <span className="truncate">{app.location || 'Not specified'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {app.salary || '—'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4"><StatusBadge status={app.status} /></TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-gray-500">{new Date(app.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all"
                                            // onClick={() => { setEditApp(app); setIsModalOpen(true); }}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                                            // onClick={() => deleteApplication(app.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="6" className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-300">
                                            <Search size={32} />
                                        </div>
                                        <p className="text-gray-500 font-medium">No applications found matching your search.</p>
                                        <Button variant="secondary" onClick={() => setSearchQuery('')}>Clear Search</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    </>
    )
}
