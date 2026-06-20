/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import useActivationStatus from "@/hooks/admin/useActivationStatus"
import { Switch } from "@headlessui/react"
import React, { useState } from "react"

export default function ActivationChip({
  gen,
  error,
  isActivationLoading,
  setActivationStatus,
}: {
  gen: number
  error: string
  isActivationLoading: boolean
  setActivationStatus: (isActive: boolean, generation: number) => Promise<void>
}) {
  const { isActive } = useActivationStatus(gen)

  return (
    <div className="flex flex-col justify-start space-y-1 text-lg">
      <div className="flex w-full items-center justify-between gap-2">
        <p>({gen})</p>
        <Switch
          disabled={isActivationLoading}
          checked={isActive}
          onChange={(val) => {
            setActivationStatus(val, gen)
          }}
          className={`${
            isActive ? "bg-yellow" : "bg-gray-400"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              isActive ? "translate-x-6 bg-navy" : "translate-x-1 bg-white "
            } inline-block h-4 w-4 transform rounded-full transition`}
          />
        </Switch>
      </div>
      <p className="text-red-500">{error}</p>
    </div>
  )
}
