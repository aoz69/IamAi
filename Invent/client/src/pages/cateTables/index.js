// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CategoryTable from 'src/views/tables/categoryTable'


const Tables = () => {
  return (
    <Grid container spacing={6}>
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