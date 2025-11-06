@extends('app')
@section('content')
@if ($errors->any())
<div style="color:red">
    <ul>
        @foreach ($errors->all() as $er)
        <div class="alert alert-danger" role="alert">
           <strong>Alert!</strong> {{ $er }}
           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        @endforeach
    </ul>
</div>
@endif
    <form action="{{ route('product.update', $edit->id) }}" method="post">
        @csrf
        @method('put')
        <div class="row">
            <div class="col-sm-6">
                <div class="mb-3">
                    <label for="" class="form-label">Name</label>
                    <select name="category_id" id="" class="form-control">
                        <option value="">Select One</option>
                        @foreach ($categories as $category )
                        <option {{ $edit->category_id == $category->id ?'selected':'' }} value="{{ $category->id }}">{{ $category->category_name }}</option>
                       @endforeach
                    </select>
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Price</label>
                    <input type="text" placeholder="Enter Product Price" class="form-control" name="product_price" value="{{ $edit->product_price }}">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Status</label>
                    <br>
                    <input type="radio" id="is_active_1" name="is_active" value="1" {{ $edit->is_active == 1 ? 'checked':'' }}> Publish
                    <input type="radio" id="is_active_0" name="is_active" value="0" {{ $edit->is_active == 0 ? 'checked':'' }}> Draft
                </div>
            </div>
            <div class="col-sm-6">
                <div class="mb-3">
                    <label for="" class="form-label">Name</label>
                    <input type="text" placeholder="Enter Product Name" class="form-control" name="product_name" value="{{ $edit->product_name }}">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Description</label>
                    <textarea name="product_description" id="" class="form-control">{{ $edit->product_description }}</textarea>
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Photo</label>
                    <input type="file" name="product_photo" class="form-control"><img width="100" src="{{ asset('storage/' . $edit->product_photo) }}" alt="{{ $edit   ->product_name }}">
                </div>
            </div>
        </div>
        <button type="submit" name="" class="btn btn-primary mt-2">Save Change</button>
    </form>
@endsection