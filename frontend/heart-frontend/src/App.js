import React,{useState} from 'react';
import axios from 'axios';
import { Container,TextField,Button,Typography,CircularProgress,Grid,Box,Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const fieldLabels = {
  age:'Age',
  sex:'Sex',
  cp: 'Chest Pain Type (0-3)',
  trestbps: 'Resting BP',
  chol: 'Cholesterol',
  fbs: 'Fasting Blood Sugar (>120) (0/1)',
  restecg: 'Rest ECG (0–2)',
  thalach: 'Max Heart Rate',
  exang: 'Exercise Induced Angina (0/1)',
  oldpeak: 'Oldpeak (ST depression)',
  slope: 'Slope (0–2)',
  ca: 'Number of Major Vessels (0–3)',
  thal: 'Thalassemia (1=Normal, 2=Fixed, 3=Reversible)',
}


function App() {
  const [form,setForm]=useState({
    age:58,
    sex:1,
    cp:2,
    trestbps:130,
    chol:230,
    fbs:0,
    restecg:1,
    thalach:160,
    exang:0,
    oldpeak:1.5,
    slope:2,
    ca:0,
    thal:2
  })

  const [result,setResult] = useState('');
  const [loading,setLoading] = useState(false);

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:Number(e.target.value)});
  }

  const handleSubmit=async()=>{
    setLoading(true)
    try{
      const response = await axios.post('http://localhost:5000/predict',form);
      setResult(response.data.message)
    }catch(error){
      console.error('Prediction error',error)
      setResult('Error occurred')
    }
    setLoading(false)
  }

  return (
    <Container maxWidth="sm" style={{marginTop:"1rem"}}>
      <Paper elevation={3} style={{padding:'1rem',maxHeight:'90vh',overflowY:'auto'}}>
        <Typography align='center' variant='h4' style={{marginBottom:'1rem'}}>
          Heart Diseases Predictor
        </Typography>
        
        <Grid container spacing={2}>
          {Object.keys(form).map((field)=>(
            <Grid item xs={12} sm={6} key={field}>
              {field === 'sex' ? (
                  <TextField
                  select
                  fullWidth
                  variant="outlined"
                  label="Sex"
                  name="sex"
                  value={form.sex}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={0}>Female</MenuItem>
                </TextField>

              ) : (
                <TextField 
                  fullWidth 
                  label={fieldLabels[field]} 
                  name={field} 
                  value={form[field]} 
                  onChange={handleChange} 
                  type="number" 
                  variant='outlined'
                  inputProps={{ step: field === 'oldpeak' ? '0.1' : '1' }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      
        <Box mt={3} display='flex' justifyContent='center'>
          <Button variant='contained' color='primary' onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Predict'}
          </Button>
        </Box>

        <Box mt={2} textAlign='center'>
          {result && (
            <Typography variant='h6'>
              Result: <strong>{result}</strong>
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;