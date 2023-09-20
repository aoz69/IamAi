// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import UserTable from 'src/views/tables/userTable'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'


const Table = () => {

  const router = useRouter();
  const handleClick = () => {
    router.push('pages/addProduct')
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ marginBottom: 5 }}>
          <CardHeader title='Users' titleTypographyProps={{ variant: 'h6' }} />
          <UserTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Table
