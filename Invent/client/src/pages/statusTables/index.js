// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import InStockTable from 'src/views/tables/inStockTable'
import LowStockTable from 'src/views/tables/lowStockTable'
import ArchivedTable from 'src/views/tables/archivedTable'
import SoldTable from 'src/views/tables/salesTable'


const Tables = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ marginBottom: 5 }}>
          <CardHeader title='Products in stock table' titleTypographyProps={{ variant: 'h6' }} />
          <InStockTable />
        </Card>
        <Card sx={{ marginBottom: 5 }}>
          <CardHeader title='Low on stock table' titleTypographyProps={{ variant: 'h6' }} />
          <LowStockTable />
        </Card>
        <Card sx={{ marginBottom: 5 }}>
          <CardHeader title='Archived products table' titleTypographyProps={{ variant: 'h6' }} />
          <ArchivedTable />
        </Card>
        <Card sx={{ marginBottom: 5 }}>
          <CardHeader title='Sales table' titleTypographyProps={{ variant: 'h6' }} />
          <SoldTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Tables;