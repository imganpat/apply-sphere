import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { createJob } from '@/lib/api'
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ApplicationModal({ open, application, onOpenChange }) {

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        location: "",
        salary: "",
        source: "",
        status: "",
        applied_date: "",
        jobLink: "",
        notes: "",
    });

    useEffect(() => {
        if (application) {
            setFormData({
                company: application.company ?? "",
                role: application.role ?? "",
                location: application.location ?? "",
                salary: application.salary ?? "",
                status: application.status ?? "",
                source: application.source ?? "",
                applied_date: application.applied_date?.split("T")[0] ?? "",
                jobLink: application.job_link ?? "",
                notes: application.notes ?? "",
            })
        } else {
            setFormData({
                company: "",
                role: "",
                location: "",
                salary: "",
                status: "",
                source: "",
                applied_date: "",
                jobLink: "",
                notes: "",
            })
        }
    }, [application, open])

    const emptyForm = {
        company: "",
        role: "",
        location: "",
        salary: "",
        status: "",
        source: "",
        applied_date: "",
        jobLink: "",
        notes: "",
    }

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createJob,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["applications"],
            });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (application) {
            console.log("edit application ", formData);
        } else {
            await mutation.mutateAsync(formData);
        }

        onOpenChange(false);
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {application
                            ? "Edit Application"
                            : "Add New Application"}
                    </DialogTitle>
                    <DialogDescription>
                        {application
                            ? "Update the details of your job application."
                            : "Add a new job application to track."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 mt-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) =>
                                handleChange("company", e.target.value)
                            }

                            placeholder="e.g., Google"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role *</Label>
                        <Input
                            id="role"
                            value={formData.role}
                            onChange={(e) =>
                                handleChange("role", e.target.value)
                            }
                            placeholder="e.g., Software Engineer"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <Input id="location" type="text" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="e.g., San Francisco, CA" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="applied_date">Salary *</Label>
                            <Input id="salary" type="text" value={formData.salary} onChange={(e) => handleChange("salary", e.target.value)} placeholder="e.g., $100,000 - $150,000" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="source">Source *</Label>
                        <Input
                            id="source"
                            value={formData.source}
                            onChange={(e) =>
                                handleChange("source", e.target.value)
                            }
                            placeholder="e.g., LinkedIn, Company Website"
                            required
                        />
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Status *</Label>
                            <Select
                                id="status"
                                value={formData.status}
                                onValueChange={(value) =>
                                    handleChange("status", value)
                                }
                                required
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="applied">
                                        Applied
                                    </SelectItem>
                                    <SelectItem value="screening">
                                        Screening
                                    </SelectItem>
                                    <SelectItem value="interview">
                                        Interview
                                    </SelectItem>
                                    <SelectItem value="offer">
                                        Offer
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                        Rejected
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="applied_date">
                                Date Applied *
                            </Label>
                            <Input
                                id="applied_date"
                                type="date"
                                value={formData.applied_date}
                                onChange={(e) =>
                                    handleChange("applied_date", e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="jobLink">Job Link</Label>
                        <Input
                            id="jobLink"
                            type="url"

                            value={formData.jobLink}
                            onChange={(e) =>
                                handleChange("jobLink", e.target.value)
                            }
                            placeholder="https://company.com/jobs/123"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {application ? "Update" : "Add"} Application
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
