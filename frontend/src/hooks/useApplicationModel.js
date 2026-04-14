import { useState } from "react";

export function useApplicationModel() {
    const [open, setOpen] = useState(false);
    const [application, setApplication] = useState(null)

    const handleAdd = () => {
        setApplication(null);
        setOpen(true);
    }

    const handleEdit = (application) => {
        setApplication(application);
        setOpen(true);
    }

    const handleOpenChange = (value) => {
        setOpen(value);
        if (!value) setApplication(null);
    }

    return { open, application, handleAdd, handleEdit, handleOpenChange }
}

