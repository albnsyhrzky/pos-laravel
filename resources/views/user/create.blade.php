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
    <form action="{{ route('user.store') }}" method="post">
        @csrf
        <label for="" class="form-label">Username</label>
        <input type="text" class="form-control" name="name" value="{{ old('name') }}" required>

        <label for="" class="form-label">Email</label>
        <input type="email" class="form-control" name="email" value="{{ old('email') }}" required>

        <label for="" class="form-label">Password</label>
        <input type="password" class="form-control" name="password" value="{{ old('password') }}" required>

        <button type="submit" name="" class="btn btn-primary mt-2">Create</button>
        <a class="btn btn-danger btn-md" href="{{ route('user.index') }}">Back</a>
    </form>
@endsection