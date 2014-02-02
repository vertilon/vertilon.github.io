require(['three', 'underscore', "jquery", "FirstPersonControls"], function(THREE, _, $, FirstPersonControls) {
  $(document).ready(function() {
    var camera, scene, renderer;
    var controls, clock;
    var geometry, material, mesh;

    init();
    animate();

    function init() {

      renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setClearColor(0xbfd1e5);

      clock = new THREE.Clock();

      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.z = 300;
      camera.position.y = 400;
      camera.position.x = 20;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      controls = new THREE.FirstPersonControls( camera );
      controls.movementSpeed = 100;
      controls.lookSpeed = 0.06;

      scene = new THREE.Scene();

      // light = new THREE.DirectionalLight(0x303030, 0.5);
      // light.position.set(60, 500, -20);
      // scene.add(light);


      document.body.appendChild( renderer.domElement );

      $.getJSON("mars.json", function(data) {
        var w = 360;//360;
        var h = 180;//180;
        geometry = new THREE.PlaneGeometry(w, h, w - 1, h - 1);
        geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ));
        var shade;
        var vector3h = new THREE.Vector3(0, 0, 0);
        var vector3d = new THREE.Vector3(0, 0, 0);
        var vector3n = new THREE.Vector3(0, 0, 0);
        var sun = new THREE.Vector3(1, 1, 1);
        sun.normalize();
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var context = canvas.getContext("2d");
        context.fillStyle = "#000";
        context.fillRect(0, 0, w, h);
        var image = context.getImageData(0, 0, canvas.width,canvas.height);
        var imageData = image.data;
        var k = 0;
        for(var i = 0; i < h; ++i)
          for(var j = 0; j < w; ++j) {
            geometry.vertices[i * w + j].y = data.lines[i][j] / 512;
            vector3h.y = (j > 2 ? data.lines[i][j-2] : 0) - (j < (w - 2) ? data.lines[i][j+2] : 0);
            vector3h.x = 2048;
            vector3h.normalize();
            vector3d.y = ( i > 2 ? data.lines[i - 2][j] : 0) - (i < (h - 2) ? data.lines[i + 2][j] : 0);
            vector3d.z = 2048;
            vector3d.normalize();
            vector3n.crossVectors(vector3h, vector3d).normalize();
            shade = vector3n.dot(sun);
            imageData[k] = (96 + shade * 128);
            imageData[k + 1] = (32 + shade * 96);
            imageData[k + 2] = (shade * 96);
            k += 4;
          }
        context.putImageData(image, 0, 0);

        var canvasScaled = document.createElement("canvas");
        canvasScaled.width = 2 * w;
        canvasScaled.height = 2 * h;
        context = canvasScaled.getContext("2d");
        context.scale(2, 2);
        context.drawImage(canvas, 0, 0);

        var texture = new THREE.Texture(canvasScaled, new THREE.UVMapping(), THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping);
        texture.needsUpdate = true;
        mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: texture}));

        scene.add(mesh);
      });

    }

    function animate() {
      requestAnimationFrame( animate );

      controls.update(clock.getDelta());

      renderer.render( scene, camera );
    }
  });
});
