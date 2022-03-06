<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    function addProduct(Request $request)
    {
        $product = new Product();
        $product->NAME = $request->input('name');
        $product->DESCRIPTION = $request->input('description');
        $product->PRICE = $request->input('price');
        $product->FILE_PATH = $request->file('image')->store('Products');
        $product->save();

        return ['status' => true, 'message' => 'Products added succesfully.'];
    }

    function getProducts()
    {
        return Product::all();
    }

    function searchProducts($key)
    {
        return Product::where('NAME', 'LIKE', "%$key%")->get();
    }

    function deleteProduct($idProduct)
    {
        $result = Product::where('id', $idProduct)->delete();
        if ($result) {
            return ['status' => $result, 'message' => 'Product deleted successfully.'];
        } else {
            return ['status' => $result, 'message' => 'Cannot delete product, product does not exist or has been deleted.'];
        }
    }

    function getProductDetail($productId)
    {
        return Product::find($productId);
    }

    function updateProduct(Request $request, $productId)
    {
        $product = Product::find($productId);

        $product->NAME = $request->input('name');
        $product->DESCRIPTION = $request->input('description');
        $product->PRICE = $request->input('price');

        // check if image is changed
        if ($request->hasFile('image')) {
            $path = $product->FILE_PATH;

            if(Storage::exists($path))
            {
                Storage::delete($path);
            }

            $product->FILE_PATH = $request->file('image')->store('Products');
        }

        // save update
        $product->save();

        return ['status' => $product->wasChanged(), 'message' => 'Products updated succesfully'];
    }
}
