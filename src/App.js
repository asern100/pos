import './App.css';
import React, {useState,useEffect} from 'react'
import axios from "axios"
import { Container, Row, Col, Card  } from 'reactstrap';

function App() {


  const [categories,setCategories] = useState([]);
  const [meals,setMeals] = useState([]);
  const [categorySelected,setCategorySelected] = useState();

  useEffect(() => {
    axios.get("http://localhost:3000/categories/").then(response => {
      setCategories(response.data)   
    })

    axios.get("http://localhost:3000/meals/").then(response => {
      setMeals(response.data)
        
    })
  }, [])

  return (
    <div className="App" style={{backgroundColor:"#F5F5F5"}}>

    <Container>
    <Row >
      <Col xs="12" md="8" style={{height:800, }}>
        <Row>
        <Card style={{backgroundColor:"#FFFFFF",height:70, margin:5}}>
          
        </Card>
        </Row>
        <Row md="4"  xs="6">
          {meals.map(meal => 
            <Col>
              <Card style={{backgroundColor:"#FFFFFF",height:150, margin:5}}>
                <div style={{height:"100%",width:"100%", backgroundImage:`url(${meal.image})`, backgroundSize:"100% 100%" , position: "relative"}}>
                  <div style={{height:"100%",width:"100%", backgroundColor:"#000", opacity:0.6, position:"absolute" ,zIndex:1}}>
                  </div>
                  <div style={{ color:"#FFF", position:"absolute" , zIndex:111 ,height:"100%",width:"100%", }}>
                  <span >{meal.name}</span>
                  </div>
                </div>
              </Card>
            </Col>
          )}
         
          
        </Row>
        
      </Col>
      <Col xs="12" md="4">
        <Card style={{backgroundColor:"#FFFFFF",height:600, margin:5}}>
          
          </Card>
      </Col>
    </Row>
    </Container>
    </div>
  );
}

export default App;
