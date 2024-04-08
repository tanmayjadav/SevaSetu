import React from 'react'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

const FoundationCard = ({foundation}) => {
  return (
    <CardContent className="flex flex-col lg:flex-row gap-5">
          <div className="w-full border-none">
            <img
              className=" relative object-cover object-center h-full brightness-100 rounded-lg"
              src={foundation.foundation_image_url}
              alt=""
            />
          </div>
          <div className="w-full ">
            <CardHeader className="p-0 md:p-0 my-5">
              <CardTitle className="text-l md:text-xl">
                {foundation.foundation_name}
              </CardTitle>
              <CardDescription>
                {foundation.foundation_short_description}
              </CardDescription>
            </CardHeader>
            <div className="text-s md:text-md text-card-foreground">
              <CardTitle className="text-lg">Cause:</CardTitle>
              {foundation.foundation_cause}
            </div>
            <br />
            <div className="text-s md:text-md text-card-foreground">
              <CardTitle className="text-lg">Impact:</CardTitle>
              {foundation.foundation_impact}
            </div>
          </div>
        </CardContent>
  )
}

export default FoundationCard
