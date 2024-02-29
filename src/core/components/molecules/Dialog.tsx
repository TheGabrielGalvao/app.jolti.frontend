
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';

export const DialogDemo = () => (
    <Dialog.Root>
        <Dialog.Trigger asChild>
            <button className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600">Editar Perfil</button>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className="bg-gray-800" />
            <Dialog.Content className="bg-card p-4 rounded-lg">
                <Dialog.Title className="text-center text-2xl">Editar Perfil</Dialog.Title>
                <Dialog.Description className="text-gray-600">
                    Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
                </Dialog.Description>
                <fieldset className="my-4">
                    <label className="text-gray-800" htmlFor="name">
                        Nome
                    </label>
                    <input className="bg-gray-200 rounded-lg p-2" id="name" defaultValue="Pedro Duarte" />
                </fieldset>
                <fieldset className="my-4">
                    <label className="text-gray-800" htmlFor="username">
                        Usuario
                    </label>
                    <input className="bg-gray-200 rounded-lg p-2" id="username" defaultValue="@peduarte" />
                </fieldset>
                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                    <Dialog.Close asChild>
                        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
                    </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <X size={32} weight="fill" />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);
