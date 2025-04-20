"use client";
import React, { useEffect, useRef } from 'react';

const ClusteringEffect = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const c = canvasRef.current;
    let w = c.width = window.innerWidth;
    let h = c.height = window.innerHeight;
    let $ = c.getContext("2d");
    
    let _x = 0;
    let _y = 0;
    let _z = 200;
    let u = 0;
    
    const dtr = function(d) {
      return d * Math.PI / 180;
    };
    
    const rnd = function() {
      return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
    };
    
    const dst = function(p1, p2, p3) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
    };
    
    const cam = {
      prime: {
        x: _x,
        y: _y,
        z: _z
      },
      sub: {
        x: 0,
        y: 0,
        z: 1
      },
      dst: {
        x: 0,
        y: 0,
        z: 200
      },
      ang: {
        phic: 0,
        phis: 0,
        thetac: 0,
        thetas: 0
      },
      zoom: 1,
      disp: {
        x: w / 2,
        y: h / 2,
        z: 0
      },
      upd: function() {
        cam.dst.x = cam.sub.x - cam.prime.x;
        cam.dst.y = cam.sub.y - cam.prime.y;
        cam.dst.z = cam.sub.z - cam.prime.z;
        cam.ang.phic = -cam.dst.z / Math.sqrt(cam.dst.x * cam.dst.x + cam.dst.z * cam.dst.z);
        cam.ang.phis = cam.dst.x / Math.sqrt(cam.dst.x * cam.dst.x + cam.dst.z * cam.dst.z);
        cam.ang.thetac = Math.sqrt(cam.dst.x * cam.dst.x + cam.dst.z * cam.dst.z) / Math.sqrt(cam.dst.x * cam.dst.x + cam.dst.y * cam.dst.y + cam.dst.z * cam.dst.z);
        cam.ang.thetas = -cam.dst.y / Math.sqrt(cam.dst.x * cam.dst.x + cam.dst.y * cam.dst.y + cam.dst.z * cam.dst.z);
      }
    };
    
    const trans = {
      parts: {
        sz: function(p, sz) {
          return {
            x: p.x * sz.x,
            y: p.y * sz.y,
            z: p.z * sz.z
          };
        },
        rot: {
          x: function(p, rot) {
            return {
              x: p.x,
              y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
              z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
            };
          },
          y: function(p, rot) {
            return {
              x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
              y: p.y,
              z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
            };
          },
          z: function(p, rot) {
            return {
              x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
              y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
              z: p.z
            };
          }
        },
        pos: function(p, pos) {
          return {
            x: p.x + pos.x,
            y: p.y + pos.y,
            z: p.z + pos.z
          };
        }
      },
      vp: {
        phi: function(p) {
          return {
            x: p.x * cam.ang.phic + p.z * cam.ang.phis,
            y: p.y,
            z: p.x * -cam.ang.phis + p.z * cam.ang.phic
          };
        },
        theta: function(p) {
          return {
            x: p.x,
            y: p.y * cam.ang.thetac - p.z * cam.ang.thetas,
            z: p.y * cam.ang.thetas + p.z * cam.ang.thetac
          };
        },
        resvp: function(p) {
          return {
            x: p.x - cam.prime.x,
            y: p.y - cam.prime.y,
            z: p.z - cam.prime.z
          };
        }
      },
      persp: function(p) {
        return {
          x: p.x * cam.dst.z / p.z * cam.zoom,
          y: p.y * cam.dst.z / p.z * cam.zoom,
          z: p.z * cam.zoom,
          p: cam.dst.z / p.z
        };
      },
      disp: function(p, disp) {
        return {
          x: p.x + disp.x,
          y: -p.y + disp.y,
          z: p.z + disp.z,
          p: p.p
        };
      },
      calc: function(obj, sz, rot, pos, disp) {
        var ret = trans.parts.sz(obj, sz);
        ret = trans.parts.rot.x(ret, rot);
        ret = trans.parts.rot.y(ret, rot);
        ret = trans.parts.rot.z(ret, rot);
        ret = trans.parts.pos(ret, pos);
        ret = trans.vp.phi(ret);
        ret = trans.vp.theta(ret);
        ret = trans.vp.resvp(ret);
        ret = trans.persp(ret);
        ret = trans.disp(ret, disp);
        return ret;
      }
    };
    
    const Verts = function(par) {
      this.transIn = {};
      this.transOut = {};
      this.transIn.vtx = (par.vtx);
      this.transIn.sz = (par.sz);
      this.transIn.rot = (par.rot);
      this.transIn.pos = (par.pos);
    };
    
    Verts.prototype.updvtx = function() {
      this.transOut = trans.calc(
        this.transIn.vtx,
        this.transIn.sz,
        this.transIn.rot,
        this.transIn.pos,
        cam.disp
      );
    };
    
    const Obj = function() {
      this.vel = 0.04;
      this.maxt = 360;
      this.diff = 200;
      this.pos = 100;
      
      this.tx = _x;
      this.ty = _y;
      this.u = 0;
      this.set();
    };
    
    Obj.prototype.set = function() {
      this.c = c;
      this.$ = $;
      this.v = [];
      this.dist = [];
      this.reps = [];
      
      const num = 800;
      
      for (var i = 0, len = num; i < len; i++) {
        this.v[i] = new Verts({
          vtx: {
            x: rnd(),
            y: rnd(),
            z: rnd()
          },
          sz: {
            x: 0,
            y: 0,
            z: 0
          },
          rot: {
            x: 20,
            y: -20,
            z: 0
          },
          pos: {
            x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
            y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
            z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
          }
        });
        this.reps[i] = {
          x: 360 * Math.random(),
          y: 360 * Math.random(),
          z: 360 * Math.random()
        };
      }
      
      this.rots = {
        x: 0,
        y: 0,
        z: 0
      };
      
      this.size = {
        x: w / 5,
        y: h / 5,
        z: w / 5
      };
    };
    
    Obj.prototype.obj = function() {
      this.v.push(new Verts({
        vtx: {
          x: rnd(),
          y: rnd(),
          z: rnd()
        },
        sz: {
          x: 0,
          y: 0,
          z: 0
        },
        rot: {
          x: 20,
          y: -20,
          z: 0
        },
        pos: {
          x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
          y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
          z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
        }
      }));
      this.reps.push({
        x: 360 * Math.random(),
        y: 360 * Math.random(),
        z: 360 * Math.random()
      });
    };
    
    Obj.prototype.upd = function() {
      cam.prime.x += (this.tx - cam.prime.x) * 0.05;
      cam.prime.y += (this.ty - cam.prime.y) * 0.05;
    };
    
    Obj.prototype.draw = function() {
      this.$.clearRect(0, 0, this.c.width, this.c.height);
      cam.upd();
      this.rots.x += 0.1;
      this.rots.y += 0.1;
      this.rots.z += 0.1;
      
      for (var i = 0; i < this.v.length; i++) {
        for (var val in this.reps[i]) {
          if (this.reps[i].hasOwnProperty(val)) {
            this.reps[i][val] += this.vel;
            if (this.reps[i][val] > this.maxt) this.reps[i][val] = 0;
          }
        }
        
        this.v[i].transIn.pos = {
          x: this.diff * Math.cos(this.reps[i].x * Math.PI / 180),
          y: this.diff * Math.sin(this.reps[i].y * Math.PI / 180),
          z: this.diff * Math.sin(this.reps[i].z * Math.PI / 180)
        };
        
        this.v[i].transIn.rot = this.rots;
        this.v[i].transIn.sz = this.size;
        this.v[i].updvtx();
        
        if (this.v[i].transOut.p < 0) continue;
        var g = $.createRadialGradient(this.v[i].transOut.x,
          this.v[i].transOut.y,
          0,
          this.v[i].transOut.x,
          this.v[i].transOut.y,
          this.v[i].transOut.p * 2);
        g.addColorStop(0, 'hsla(218, 95%, 85%, 1)');
        g.addColorStop(1, 'hsla(218, 100%,85%,.4)');
        this.$.save();
        this.$.fillStyle = g;
        this.$.beginPath();
        this.$.arc(this.v[i].transOut.x, this.v[i].transOut.y, this.v[i].transOut.p * 2, 0, Math.PI * 2, false);
        this.$.fill();
        this.$.closePath();
        this.$.restore();
      }
    };
    
    Obj.prototype.loop = function() {
      const loop = () => {
        this.upd();
        this.draw();
        requestAnimationFrame(loop);
      };
      loop();
    };
    
    Obj.prototype.run = function() {
      this.loop();
      
      const handleMouseMove = (e) => {
        this.tx = (e.clientX - this.c.width / 2) * -0.8;
        this.ty = (e.clientY - this.c.height / 2) * 0.8;
      };
      
      const handleTouchMove = (e) => {
        e.preventDefault();
        this.tx = (e.touches[0].clientX - this.c.width / 2) * -0.8;
        this.ty = (e.touches[0].clientY - this.c.height / 2) * 0.8;
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      
      // Cleanup function
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      };
    };
    
    const o = new Obj();
    const cleanup = o.run();
    
    // Handle window resize
    const handleResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      o.set();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on component unmount
    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      id="canv" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'radial-gradient(ellipse farthest-corner at center top, hsla(230, 100%, 5%, 1) 0%, hsla(231, 90%, 1%, 1) 100%)'
      }}
    />
  );
};

export default ClusteringEffect; 