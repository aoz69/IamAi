// ** MUI Imports
import Grid from '@mui/material/Grid'
import AddCate from 'src/views/forms/addCategory'


const Tables = () => {
  return (

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <AddCate />
        </Grid>
      </Grid>

  )
}

export default Tables;