import './App.css';
import React, { useState, useEffect } from 'react'
import axios from "axios"
import {  Table,  Row, Col, Card, Button} from 'reactstrap';

import AddCategory from './components/AddCategory';
import AddSubCategory from './components/AddSubCategory';
import AddMeal from './components/AddMeal';

import UpdateCategory from './components/UpdateCategory';
import UpdateSubCategory from './components/UpdateSubCategory';
import UpdateMeal from './components/UpdateMeal';

import DeleteCategory from './components/DeleteCategory';
import Ticket from './components/Ticket';

import NoteModal from './components/NoteModal';
import TacosModal from './components/TacosModal';



function App() {



  const size = useWindowSize()


  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [list, setList] = useState([])
  const [total, setToltal] = useState(0)
  const [orderNumber, setOrderNumber] = useState(1)
  const [tacos, setTacos] = useState([])


  const [counter, setCounter] = useState(1);
  const incrementCounter = (index) => {
    list[index].quantity++
    setCounter(list[index].quantity)
    console.log("up")
  };
  const decrementCounter = (index) => {

    if (list[index].quantity > 0) {
      list[index].quantity--
      setCounter(list[index].quantity)
    }
    if (list[index].quantity < 1) {

      setList(list.filter(item => item.name !== list[index].name))

    }
    console.log("up")
  };

  const handleSelectMeal = (choice) => {
    if (list) {
      let x;
      list.forEach(l => {
        if (l._id === choice._id) {
          x = 1
          alert('Choi ' + l.name + ' déja exist !')
        }
      });
      if (!x) {
        setList([...list, choice])
      }
    }
  }

  const addNote = (note, index) => {
    //alert(note)

    list[index].note = note
    //alert(JSON.stringify(list))
  }

  const addTacos = (tacos, index) => {
    //alert(tacos)
    tacos.forEach(t => {
      list[index].tacos.push(t)
    });

    //alert(JSON.stringify(list))
  }
  axios.get("http://localhost:3000/orders").then(response => {
      setOrderNumber(response.data.length+1)})
  useEffect(() => {
    axios.get("http://localhost:3000/orders").then(response => {
      setOrderNumber(response.data.length+1)
  })
  }, [orderNumber])

  useEffect(() => {
    let t = 0
    list.map(l => t = t + l.quantity * l.price)
    setToltal(t)
  }, [list, counter])



  useEffect(() => {
    axios.get("http://localhost:3000/categories/").then(response => {
      setCategories(response.data)
    })

    axios.get("http://localhost:3000/subCategories/").then(response => {
      setSubCategories(response.data)
    })

    axios.get("http://localhost:3000/meals/").then(response => {
      setMeals(response.data)
    })


    axios.get("http://localhost:3000/meals/60d337e361c68016bce1eab4").then(response => {
      setTacos(response.data)
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
  const handleOrder = (list) => {
    list.forEach(order => {
      delete order.categoryID
      delete order.subCategoryID
      delete order.image
      delete order.__v
    });
    if (list.length) {

      axios.post('http://localhost:3000/orders/', { ...list, amount: total, number: orderNumber }).then(res => {
        if (res.status === 200) {
          setOrderNumber(orderNumber + 1)
          setList([])

        }
      })
    }
  }
  return (
    <div className="App" style={{ backgroundColor: "#F5F5F5", height: `${size.height}` }}>

      <div style={{
        height: 70,
        fontFamily: 'Lobster',
        textAlign: "left",
        padding: 10,
        color: "#522E2A"
      }} >
        <h2>Zina Caffe</h2>
      </div>
      <Row style={{ fontFamily: 'Lobster' }}>

        <Col xs="12" md="2"  >
          <AddCategory buttonLabel={"Category"} />
          {categories.map(category =>
            <Row xs="1">
              <Col>
                <Card style={{ backgroundColor: "#FFFFFF", height: 70, margin: 5 }} onClick={() => setCategory(category._id)}>
                  <div style={{ height: "100%", width: "100%", backgroundImage: `url(${category.image})`, backgroundSize: "100% 100%", position: "relative" }}>
                    <DeleteCategory category={category} />
                    <UpdateCategory category={category} />

                    <div style={{ height: "100%", width: "100%", backgroundColor: "#000", opacity: 0.6, position: "absolute", zIndex: 1 }}>
                    </div>
                    <div style={{ color: "#FFF", position: "absolute", zIndex: 111, height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}>
                      <span >{category.name}</span>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
        <Col xs="12" md="2"  >
          <AddSubCategory buttonLabel={"SubCategory"} />
          {subCategories.map(subCategory => (subCategory.categoryID === category) ?
            <Row xs="1">
              <Col>
                <Card style={{ backgroundColor: "#FFFFFF", height: 70, margin: 5 }} onClick={() => setSubCategory(subCategory._id)}>
                  <div style={{ height: "100%", width: "100%", backgroundImage: `url(${subCategory.image})`, backgroundSize: "100% 100%", position: "relative" }}>
                    <UpdateSubCategory subCategory={subCategory} />
                    <div style={{ height: "100%", width: "100%", backgroundColor: "#000", opacity: 0.6, position: "absolute", zIndex: 1 }}>
                    </div>
                    <div style={{ color: "#FFF", position: "absolute", zIndex: 111, height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}>
                      <span >{subCategory.name}</span>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row> : null
          )}
        </Col>
        <Col xs="12" md="4"  >
          <AddMeal buttonLabel={"MealAddMeal"} />
          <Row lg="2" xs="2">

            {meals.map(meal => (meal.subCategoryID === subCategory) ?
              <Col>
                <Card style={{ backgroundColor: "#FFFFFF", height: 70, margin: 5 }} onClick={() => handleSelectMeal({ ...meal, "quantity": 1, "note": "", "tacos": [] })}>
                  <div style={{ height: "100%", width: "100%", backgroundImage: `url(${meal.image})`, backgroundSize: "100% 100%", position: "relative" }}>
                    <UpdateMeal meal={meal} />
                    <div style={{ height: "100%", width: "100%", backgroundColor: "#000", opacity: 0.6, position: "absolute", zIndex: 1 }}>
                    </div>
                    <div style={{ color: "#FFF", position: "absolute", zIndex: 111, height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}>
                      <span style={{ fontSize: '1,5rem' }}>{meal.name}</span>
                    </div>
                  </div>
                </Card>
              </Col> :
              null

            )}


          </Row>

        </Col>
        <Col xs="12" md="4">
              
          <Card style={{ backgroundColor: "#FFFFFF", height: 600, margin: 5 }} >
            <br />
            {(list.length) ? <span style={{ right: "left" }}>Order Number : {orderNumber}</span> : null}
            <Table>
              <tbody>
                {list.map((l, index) =>


                  <tr scope="row" style={{ marginTop: 2 }}>




                    <td >{l.name}</td>



                    <td className='printCutt' >
                      <Button onClick={() => decrementCounter(index)}>-</Button>
                    </td>
                    <td  >
                      {l.quantity}
                    </td>
                    <td  className='printCutt' >
                      <Button onClick={() => incrementCounter(index)}>+</Button>
                    </td>


                    <td >{l.price * l.quantity}</td>

                    <td  className='printCutt' ><TacosModal buttonLabel={"tacos"} index={index} addTacos={addTacos} tacos={tacos} /></td>
                    <td   className='printCutt' ><NoteModal buttonLabel={"note"} index={index} addNote={addNote} /></td>



                  </tr>
                )}
              </tbody>
              <tr scope="row" style={{ marginTop: 2 }} >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td >
                  {(total > 0) ? <h5>{total} </h5> : null}
                </td>
              </tr>
              <tr scope="row" style={{ marginTop: 2 }} >

                {(total > 0) ?
                  <>
                    <td className='printCutt'>
                    <Ticket order={list} total={total} orderNumber={orderNumber} />
                    </td>
                    <td className='printCutt'>
                    <Button style={{color:"black"}}  onClick={() => handleOrder(list)}>Order</Button>
                    </td>
                   
                  </> : null}

              </tr>
            </Table>
          </Card>
          
        </Col>
      </Row>

    </div>
  );
}

export default App;
