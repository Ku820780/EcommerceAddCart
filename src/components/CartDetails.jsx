import React, { useEffect, useState } from 'react'
import "./cartstyle.css"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeToCart, removeSingleIteams, emptyCartIteam } from '../redux/features/cartSlice'
import toast from 'react-hot-toast';

const CartDetails = () => {
    const {carts} = useSelector((state)=>state.allCart)
    // console.log(carts)
    // const arr = [0, 1]

    const [totalprice, setTotalprice] = useState(0)
    const [totalcount, setTotalCount] = useState(0)

    const dispatch = useDispatch();

    //add to cart
    const handleIncrement = (e) =>{
        dispatch(addToCart(e))
    }

    //remove to cart delete cart
    const handleDeleteCart = (e) =>{
        dispatch(removeToCart(e))
        toast.success("Item Remove From Your Cart")
    }

    //removeSingle cart

    const handleSingleCart = (e) =>{
        dispatch(removeSingleIteams(e))
    }

    //emptycartItesms
    const handleEmptyCartItem = () =>{
        dispatch(emptyCartIteam())
        toast.success("Your Cart is Empty")
    }


    //count total price
    const total = () =>{
        let totalprice = 0
        carts.map((ele, ind)=>{
            totalprice = ele.price * ele.qnty + totalprice
        });
        setTotalprice(totalprice)
    }

    //count total quantity
    const countquantity = () =>{
        let totalquantity = 0
        carts.map((ele, ind)=>{
            totalquantity = ele.qnty + totalquantity
        });
        setTotalCount(totalquantity)
    }

    useEffect(()=>{
        total()
    },[total])

    useEffect(()=>{
        countquantity()
    },[countquantity])


  return (
    <div className='row justify-content-center m-0'>
        <div className='col-md-8 mt-5 mb-5 cardsdetails'>
            <div className='card'>
                <div className='card-header bg-dark p-3'>
                    <div className='card-header-flex'>
                        <h5 className='text-white m-0'>Cart Calculation{carts.length > 0 ? `(${carts.length})`:""}</h5>
                        {
                            carts.length > 0 ? <button className='btn btn-danger mt-0 btn-sm' onClick={handleEmptyCartItem}><i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span></button>
                            : ""
                        }
                    </div>
                </div>
                <div className='card-body p-0'>
                    {
                         carts.length === 0 ? <table className='table cart-table mb-0'>
                         <tbody>
                             <tr>
                                 <td colSpan={6}>
                                     <div className='cart-empty'>
                                         <i className='fa fa-shopping-cart'></i>
                                         <p>Your Cart Is Empty</p>
                                     </div>
                                 </td>
                             </tr>
                         </tbody>
                     </table> :
                     <table className='table cart-table mb-0 table-responsive-sm'>
                         <thead>
                             <tr>
                                 <th>Action</th>
                                 <th>Product</th>
                                 <th>Name</th>
                                 <th>Price</th>
                                 <th>Qty</th>
                                 <th className='text-right'> <span id="amount" className='amount'>Total Amount</span></th>
                             </tr>
                         </thead>
                         <tbody>
                            {
                                carts.map((data, index)=>{
                                    return(
                                        <>
                                            <tr>
                                                <td>
                                                    <button className='prdct-delete' onClick={()=>handleDeleteCart(data.id)}><i className='fa fa-trash-alt'></i></button>
                                                </td>
                                                <td>
                                                    <div className='product-img'><img src={data.imgdata} /></div>

                                                </td>
                                                <td><div className="product-name"><p>{data.dish}</p></div>
                                                </td>
                                                <td>{data.price}</td>
                                                <td>
                                                    <div className="prdct-qty-container">
                                                        <button className='prdct-qty-btn' type='button' 
                                                        onClick={data.qnty <= 1 ?()=>handleDeleteCart(data.id) :()=>handleSingleCart(data)}
                                                        >
                                                            <i className='fa fa-minus'></i>
                                                        </button>
                                                        <input type="text" className='qty-input-box' value={data.qnty} disabled name="" id="" />
                                                        <button className='prdct-qty-btn' type='button' onClick={()=>handleIncrement(data)}>
                                                            <i className='fa fa-plus'></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <div className="text-right mr-2">{data.qnty * data.price}</div>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                         </tbody>
                            <tfoot>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th colSpan={3}>&nbsp;</th>
                                    <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalcount}</span></th>
                                    <th className='text-right'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-danger'>₹ {totalprice}</span></th>
                                </tr>
                            </tfoot>
                        </table>
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartDetails