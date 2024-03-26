import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

import styles from "./modal.module.scss";

interface INewRoomModalProps {
    onCreate: (name: string) => void;
    buttonName: string;
}

export default function CreateModal({
    onCreate,
    buttonName,
}: INewRoomModalProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const handleModalOpen = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setName("");
        setOpen(false);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const create = () => {
        if (!name) {
            toast.error("New Room name is required");
            return;
        }

        onCreate(name);
        setName("");
        setOpen(false);
    };

    return (
        <main className={styles.main}>
            <Button onClick={handleModalOpen} className={styles.createBtn}>
                {buttonName}
            </Button>
            <Modal open={open} onClose={handleClose} className={styles.wraper}>
                <Box className={styles.continer}>
                    <TextField
                        label="Name"
                        value={name}
                        variant="outlined"
                        fullWidth
                        onChange={handleNameChange}
                        style={{
                            width: "60%",
                        }}
                        className={styles.inputField}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={create}
                    >
                        Create
                    </Button>
                </Box>
            </Modal>
        </main>
    );
}
