// ** MUI Imports
import Grid from '@mui/material/Grid'
import AddCate from 'src/views/tables/categoryTable'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'


const Table = () => {
    const router = useRouter();
  const handleClick = () => {
    router.push('pages/addCategory/')
  };
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ marginBottom: 5 }}>
          <CardHeader title='Categories table' titleTypographyProps={{ variant: 'h6' }} />
          <Button size='large' variant='contained' sx={{ margin:7}} onClick={handleClick} > Add Category </Button>
          <AddCate />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Table
