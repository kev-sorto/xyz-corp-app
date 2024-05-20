'use client'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { UserType } from "@/types/userType";
import "./userCardStyle.css";
import {Link} from "@nextui-org/link";
import React from "react";
import UserImage from "./UserImage";
import {Button} from "@nextui-org/button";
import { TrashIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type UserCardProps = {
    user: UserType;
}
export default function UserCard({user}: UserCardProps ) {

    const [open, setOpen] = useState<boolean>(false)

    const cancelButtonRef = useRef(null)

    return (
        <div className="card px-3 py-5 rounded-xl border drop-shadow-sm flex flex-col justify-center items-center">
            {/* <div className="absolute top-2 right-2">
                <Button isIconOnly color="danger" variant="flat" size="sm" onClick={() => setOpen(!open)}>
                    <TrashIcon className="danger h-4 w-4" />
                </Button>
            </div>   */}
            <UserImage 
                className={user.status === "active" ? "grayscale-0" : "grayscale"}
                gender={user.gender} 
                name={user.name} />
            <p className="font-semibold text-title text-center mt-4 mb-1">{user.name}</p>
            <p className="text-xs text-subtitle text-center mb-4">{user.email}</p>

            {/* <Link className="text-sm" href={`/users/${user.id}/posts`}>Ver posts</Link> */}
            <Button
                href={`/users/${user.id}/posts`}
                as={Link}
                color="primary"
                variant="light"
                >
                Ver posts
                <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Eliminar usuario
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Estás seguro de eliminar este usuario? Toda la información relacionada a este sera eliminada de manera permanente. 
                                        Esta acción no puede revertirse.
                                    </p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                onClick={() => setOpen(false)}
                            >
                                Eliminar
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                            >
                                Cancelar
                            </button>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}