const Cart = require("../../models/cart");
const Employee = require("../../models/employee");
const addToCart = async (req, res) => {
  try {
    const user_id = req.user._id;

    // Check if the user already has a cart
    let user_details = await Cart.findOne({ emp_id: user_id });
    console.log("user_details", user_details);

    // Create the new product object
    let new_items = {
      item_id: req.body.item_id,
      quantity: req.body.quantity,
    };

    // If the user doesn't have a cart, create a new one
    if (!user_details) {
      const new_cart = new Cart({
        emp_id: user_id,
        items: [new_items],
      });
      const response = await new_cart.save();
      return res.status(200).json({ message: "Cart is added", data: response });
    }

    // If the user already has a cart, update or add the product
    let cart_items = user_details.items;
    let itemExists = false;

    // Check if the item already exists in the cart and update the quantity
    for (let i = 0; i < cart_items.length; i++) {
      if (new_items.item_id.toString() === cart_items[i].item_id.toString()) {
        cart_items[i].quantity = new_items.quantity;
        itemExists = true;
        break;
      }
    }

    // If the product doesn't exist in the cart, add it
    if (!itemExists) {
      cart_items.push(new_items);
    }

    // Update the user's cart
    let updatedCart = await Cart.findOneAndUpdate(
      { emp_id: user_id },
      { items: cart_items },
      { new: true } // Return the updated document
    ).populate({
      path: "items.item_id",
      select: "item_name price",
    });

    return res
      .status(200)
      .json({ message: "Item added to cart successfully", data: updatedCart });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const viewCart = async(req, res)=>{
  try {
    const userId = req.user._id;
    const cartItems = await Cart.findOne({user_id:userId});
    if(!cartItems)return res.status(404).json({success:true, message:"Cart items not found!"});
    return res.status(200).json({success:true, message:"Cart items fetch successfully", data:cartItems})
  } catch (error) {
    return res.status(500).json({success:false, error:error.message});
  }
}

/********************************List Cart Items*********************************/

const listCartItems = async(req, res)=>{
  try {
    const userId = req.user._id;
    //check user existance
    const user = await Employee.findOne({_id:userId});
    if(!user) return res.status(404).json({
      success:true,
      message:"User not found!"
    });
     //fetch cart user  
    const cartItems = await Cart.find();
    if(!cartItems)return res.status(404).json({success:true, message:"Cart Itema Does Not Found1"});
    return res.status(200).json({
      success:true,
      message:"Cart items fetch successfully",
      data:cartItems
    }) ; 
  } catch (error) {
    return res.status(500).json({success:false, error:error.message});
  }
}

/**************************Remove Cart Products***************************/

const removeCartItems = async (req, res) => {
  try {
    const userId = req.user._id;
    const userCart = await Cart.findOne({ emp_id: userId }); // Use findOne instead of find to get a single cart

    if (!userCart) {
      return res.status(404).json({ success: false, message: "Cart user not found!" });
    }
       // Assuming you're passing product_id in the request body
    const item_id = req.body; 
 
    // Filter out the product(s) that don't match the given product_id
    const updatedCartItems = userCart.items.filter(element => element.item_id != item_id);
    if (updatedCartItems.length === userCart.items.length) {
      return res.status(404).json({ success: false, message: "Product not found in cart!" });
    }

    // Update the cart with the filtered items
    await Cart.findOneAndUpdate({ user_id: userId }, { item: updatedCartItems });

    return res.status(200).json({ success: true, message: "Cart item(s) removed successfully!" });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/****************************Delete Cart User******************************/

const deleteCartUser = async(req, res)=>{
  try {
    const userId = req.user._id;

    //Find user existance in Cart 
    const CartUser = await Cart.findByIdAndDelete({user_id:userId});
    if(!CartUser)return res.status(404).json({
      success:true,
       message:"User cart does not available!"
      });
    return res.status(200).json({
      success:true, 
      message:"User cart deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({success:false, error:error.message});
  }
}



module.exports = { addToCart, removeCartItems, viewCart, listCartItems, deleteCartUser };
