import { Grid } from "@mui/material";
import BusList from "./BusList";

export default function BusDashboard() {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <BusList />
            </Grid>
        </Grid>
    )
}