<img src="https://image.flaticon.com/icons/png/512/178/178396.png" height="50">

# Wizzy 1.0.0
A simple and modern wizard plugin

[View Demo](https://nenadkaevik.github.io/wizzy)

Get started
====
Copy the html template below and place your content inside step divs. Name your steps as you wish.
```
<div class="wz-wrapper wizzy">
    <div class="wz-inner">
        <div class="wz-header">
            <nav>
                <a href="#">Step 1</a>
                <a href="#">Step 2</a>
                <a href="#">Step 3</a>
            </nav>
        </div>
        <div class="wz-body">
            <div class="wz-step">
                /* Step Content */
            </div>
            <div class="wz-step">
                /* Step Content */
            </div>
            <div class="wz-step">
                /* Step Content */
            </div>
        </div>
        <div class="wz-navigator"></div>
    </div>
</div>
```

Initialize the plugin using the following snippet.
```
$('.wizard').wizzy();
```
