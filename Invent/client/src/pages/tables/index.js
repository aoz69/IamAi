// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import ProductTable from 'src/views/tables/ProductTable'


const Table = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ marginBottom: 5 }}>
          <CardHeader title='Products table' titleTypographyProps={{ variant: 'h6' }} />
          <ProductTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Table
