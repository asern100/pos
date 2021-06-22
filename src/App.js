import './App.css';
import React, {useState,useEffect, useRef} from 'react'
import axios from "axios"
import { Container, Row, Col, Card , Button} from 'reactstrap';



function App() {



  const size = useWindowSize()
  

  const [categories,setCategories] = useState([]);
  const [meals,setMeals] = useState([]);
  const [categorySelected,setCategorySelected] = useState();
  const [list,setList] = useState([])
  const [total, setToltal]= useState(0)
  

  const [counter, setCounter] = useState(1);
  const incrementCounter = (index) => {
   list[index].quantity ++
   setCounter(list[index].quantity)
   console.log("up")
  };
  const decrementCounter = (index) => {
    
    if (list[index].quantity > 0) {
      list[index].quantity --
      setCounter(list[index].quantity)
    }
    if (list[index].quantity < 1){
      
     setList(list.filter(item => item.name !== list[index].name))
      
    }  
    console.log("up")
  };

  const handleSelectMeal = (choice) => {
    if (list){
      let x;
      list.forEach(l => {
        if(l._id === choice._id){
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


  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  return (
    <div className="App" style={{backgroundColor:"#F5F5F5", height:`${size.height}`}}>

    
    <Row style={{fontFamily: 'Lobster'}}>
      <Col xs="12" md="2" style={{lineHeight: 3, fontSize: 20}}> 
      {categories.map(category  => 
        <Row xs="1">
        <Col>
        <Card style={{backgroundColor:"#FFFFFF",height:70, margin:5}} onClick={() => setCategorySelected(category._id)}>
          <div style={{height:"100%",width:"100%", backgroundImage:`url(${category.image})`, backgroundSize:"100% 100%" , position: "relative"}}>
            <div style={{height:"100%",width:"100%", backgroundColor:"#000", opacity:0.6, position:"absolute" ,zIndex:1}}>
            </div>
            <div style={{ color:"#FFF", position:"absolute" , zIndex:111 ,height:"100%",width:"100%", }}>
            <span >{category.name}</span>
            </div>
          </div>
        </Card>
      </Col>
        </Row>
      )}
      </Col>
      <Col xs="12" md="6" style={{lineHeight: 3, fontSize: 40}} >
        
        <Row md="3"  xs="6">
          {meals.map(meal  => (meal.categoryID === categorySelected) ? 
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
            </Col> : null
            
          )}
         
          
        </Row>
        
      </Col>
      <Col xs="12" md="4">
        
        <Card style={{backgroundColor:"#FFFFFF",height:600, margin:5}} >
        <br />
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
        <br />
        <br />
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            {(total>0) ? <h5>{total} </h5> : null}

          </Col>
        </Row>
        <Row>
         <Col>
         {(total>0) ?
            <Button onClick={() =>alert(size.height)}>Print</Button>
          : null}
         </Col>
        </Row>
        </Card>
      </Col>
    </Row>
    
    </div>
  );
}

export default App;
