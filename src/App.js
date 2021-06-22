import './App.css';
import React, {useState,useEffect} from 'react'
import axios from "axios"
import { Container, Row, Col, Card , Button} from 'reactstrap';

function App() {


  const [categories,setCategories] = useState([]);
  const [meals,setMeals] = useState([]);
  const [categorySelected,setCategorySelected] = useState();
  const [list,setList] = useState([])
  const [total, setToltal]= useState(0)


  const [counter, setCounter] = useState(1);
  const incrementCounter = (index) => {
   list[index].quantity ++
   setCounter(list[index].quantity)
  };
  const decrementCounter = (index) => {
    
    if (list[index].quantity > 0) {
      list[index].quantity --
      setCounter(list[index].quantity)
    }
    if (list[index].quantity < 1){
      
     setList(list.filter(item => item.name !== list[index].name))
      
    }
     
    
    
    
    
  };

  const handleSelectMeal = (choice) => {
    if (list){
      let x;
      list.forEach(l => {
        if(l.name === choice.name){
          x = 1
          alert('Choi ' + l.name + ' déja exist !')
        }
      });
      if (!x){
        setList([...list, choice])
      }
    }
  }
  useEffect(() => {
    let t = 0
   list.map(l => t = t + l.quantity * l.price)
   setToltal(t)
  }, [list, counter])

 

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
          {meals.map(meal  => 
            <Col>
              <Card style={{backgroundColor:"#FFFFFF",height:150, margin:5}} onClick={() => handleSelectMeal({...meal, "quantity":1,})}>
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
        {list.map((l, index) =>
        <Row xl="1" style={{margin:2}}>
        <Col>
            <Row xs={3}>
             <Col>{l.name}</Col>
             
             <Col>
              <Row xs={3}>
                <Col >
                <Button onClick={() => decrementCounter(index)}>-</Button>
                </Col>
                <Col>{l.quantity}</Col>
                <Col >
                <Button onClick={ () => incrementCounter(index)}>+</Button>
                </Col>
              </Row>
             </Col>

             <Col>{l.price * l.quantity}</Col>
            </Row>
        </Col>
        </Row>
        )}
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            {(total>0) ? <h5>{total} </h5> : null}
            
          </Col>
        </Row>
        </Card>
      </Col>
    </Row>
    </Container>
    </div>
  );
}

export default App;
