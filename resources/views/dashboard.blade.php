<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    You're logged in!
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

<div class="container">
    <div class="card-body">
        <h1>Hello {{ Auth::user()->name ?? Auth::user()->wallet }}</h1>
        <hr />
        @if(!Auth::user()->wallet)
        <button class="btn btn-primary web3link">Connect Your Wallet to Your Profile</button>
        @else
        <h3>Your Profile</h3>
        <form method="POST" action="{{route('save')}}">
            @csrf
            <div class="form-group mb-3">
                <label>Name</label>
                <input type="text" class="form-control" name="name" value="{{Auth::user()->name}}" required>
            </div>
            <div class="form-group mb-3">
                <label>Email</label>
                <input type="email" class="form-control" name="email" value="{{Auth::user()->email}}" required>
            </div>
            <div class="form-group mb-3">
                <label>Password</label>
                <input type="password" class="form-control" name="password">
            </div>
            <div class="form-group mb-3">
                <button type="submit" class="btn btn-primary">Save Your Profile</button>
            </div>
        </form>
        @endif
    </div>
</div>