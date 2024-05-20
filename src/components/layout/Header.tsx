'use client'
 
import {usePathname} from 'next/navigation'
import {Switch} from "@nextui-org/switch";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/link";
import { useRouter } from "next/navigation";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
} from "@nextui-org/navbar";
import {Input} from "@nextui-org/input";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";
import {RadioGroup, Radio} from "@nextui-org/radio";

import { BuildingOffice2Icon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from 'react';
import { createNewUser } from '@/app/api/users/createNewUser';

export default function Header() {
    const router = useRouter();

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [isActive, setIsActive] = useState<boolean>(true);

    const pathname = usePathname();

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("");

    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalidEmail = useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    const isInvalidName = useMemo(() => {
        return name.trim() !== "" && name.length < 3;
    }, [name]);

    const isInvalidGender = useMemo(() => {
        return gender.trim() !== "" && !['male', 'female'].includes(gender.toLowerCase());
    }, [gender]);

    const saveUser = async () => {
        
        const newUser = {
            email,
            name,
            gender,
            status: isActive ? "active" : "inactive",
        }

        await createNewUser(newUser);

        setEmail("");
        setName("");
        setGender("");
        setIsActive(true);
        onClose();
        router.refresh();
    }

    return (
        <> 
            <Navbar isBordered>
                <NavbarContent justify="start">
                    <NavbarBrand className="mr-4">
                        <BuildingOffice2Icon className="w-5 h-5 mr-1 text-primary" color='primary'/>
                        <p className="hidden sm:block font-bold text-inherit text-primary">XYZ Corp.</p>
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-3">
                        <NavbarItem isActive={pathname == "/"}>
                            <Link href="/" aria-current="page" color="foreground">
                                Usuarios
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </NavbarContent>

                <NavbarContent as="div" className="items-center" justify="end">
                    
                    
                </NavbarContent>
                
                <Button color='primary' endContent={<UserPlusIcon className="w-5 h-5 text-white"/>}
                    onPress={onOpen}>
                    {/* <UserPlusIcon className="w-4 h-4 text-white"/> */}
                    Nuevo Usuario
                </Button>
            </Navbar>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Nuevo usuario</ModalHeader>
                    <ModalBody>
                        <Input 
                            value={name}
                            type="text" 
                            label="Nombre" 
                            placeholder="Ingrese su nombre" 
                            onValueChange={setName}
                            isInvalid={isInvalidName}
                            color={isInvalidName ? "danger" : "default"}
                            errorMessage={isInvalidName && "Por favor ingrese su nombre"}
                            />
                        <Input 
                            value={email}
                            type="email" 
                            label="Email" 
                            placeholder="Ingrese su email" 
                            isInvalid={isInvalidEmail}
                            color={isInvalidEmail ? "danger" : "default"}
                            errorMessage={isInvalidEmail && "Por favor ingrese un correo válido"}
                            onValueChange={setEmail}
                        />
                        <RadioGroup
                            value={gender}
                            onValueChange={setGender}
                            isInvalid={isInvalidGender}
                            label="Selecciona tu género"
                            orientation="horizontal"
                            >
                            <Radio value="male">Masculino</Radio>
                            <Radio value="female">Femenino</Radio>
                        </RadioGroup>
                        <span className="relative text-foreground-500">Status</span>
                        <Switch defaultSelected onValueChange={setIsActive} color="success">
                            {`Usuario ${isActive ? "activo" : "inactivo"}`}
                        </Switch>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button color="primary" onPress={saveUser} 
                            isDisabled={isInvalidName || isInvalidEmail || isInvalidGender}>
                            Registrar
                        </Button>
                    </ModalFooter>
                </>
            )}
            </ModalContent>
            </Modal>
        </>
       
    )
}
