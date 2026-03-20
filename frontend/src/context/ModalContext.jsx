import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    const openJoinModal = () => setIsJoinModalOpen(true);
    const closeJoinModal = () => setIsJoinModalOpen(false);

    return (
        <ModalContext.Provider value={{ isJoinModalOpen, openJoinModal, closeJoinModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
