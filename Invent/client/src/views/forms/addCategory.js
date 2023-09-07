// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CategoryTable from 'src/views/tables/categoryTable'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'


const Tables = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('pages/addCategory/')
  };
  
  return (
    <Grid container spacing={6}>
    <Button
    size='large'
    variant='contained'
    sx={{ margin:7}}
    onClick={handleClick}
    >
    Add Category
  </Button>
      <Grid item xs={12}>
        <Card sx={{ marginBottom: 5 }}>
          <CardHeader title='Category table' titleTypographyProps={{ variant: 'h6' }} />
          <CategoryTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Tables;