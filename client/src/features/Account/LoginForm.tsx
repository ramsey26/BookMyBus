import { useAccount } from "../../lib/hooks/useAccounts"
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextInput from "../Common/TextInput";
import { useLocation, useNavigate } from "react-router";

<LockOpenIcon fontSize="large" />

export default function LoginForm() {
    const { loginUser } = useAccount();
    const location = useLocation();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/');
            }
        });
    }
    return (
        <Paper component='form' onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}
        >
            <Box display='flex' alignItems='center' justifyContent='center'
                gap={3} color='secondary.main'
            >
                <LockOpenIcon fontSize="large" />
                <Typography variant="h4">Sign in</Typography>
            </Box>
            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Password' type='password' control={control} name='password' />
            <Button type='submit' disabled={!isValid || isSubmitting}
                variant='contained' size='large'
            >
                Login
            </Button>
        </Paper>
    )
}