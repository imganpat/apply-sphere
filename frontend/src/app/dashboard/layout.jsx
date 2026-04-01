"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { TooltipProvider } from "@/components/ui/tooltip"
import { getJobs } from "@/lib/api"
import { useEffect, useState } from "react"

export default function Layout({ children }) {
  const [applications, setApplications] = useState([]);

  const getApplications = async () =>{
    setApplications(await getJobs());
  }

  useEffect(() => {
    getApplications();
  }, [])
  

  return <>
    <TooltipProvider>

      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)"
          }
        }>
        <AppSidebar variant="inset" collapsible="icon" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {/* Cards section */}
                <div className="px-4 lg:px-6">
                </div>
                {/* Recent applications */}
                {!applications ? (
                  <div>
                    No applications
                  </div>
                  ) : (
                      applications.forEach(e => { 
                        console.log(e)
                      })
                  )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
    {children}
  </>
}