(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    299(e, t, n) {
      e.exports = n(533);
    },
    533(e, t, n) {
      n.r(t);
      let a;
      const r = n(0);
      const i = n.n(r);
      const c = n(22);
      const o = n.n(c);
      const l = (n(304), n(17));
      const u = n(18);
      const s = n(148);
      const m = n(212);
      const d = n(211);
      const p = n.n(d);
      const h = n(19);
      const b = n(62);
      const v = n(63);
      const f = n(536);
      const O = n(210);
      const j = new new O.a({
        timers: [],
        superTimer: {
          duration: '00:00:00',
          durationInSeconds: 0,
          active: !1,
          currentCount: null,
          elapsedTime: 0,
          complete: !1,
        },
      })();
      const E = function(e) {
        const t = e.split(':');
        return (
          parseInt(3600 * t[0], 10) +
          parseInt(60 * t[1], 10) +
          parseInt(t[2], 10)
        );
      };
      const T = function(e) {
        return new Date(1e3 * e).toISOString().substr(11, 8);
      };
      const g = function(e) {
        return e.length
          ? Math.max.apply(
              Math,
              Object(v.a)(
                e.map(function(e) {
                  return e.durationInSeconds;
                }),
              ),
            )
          : 0;
      };
      const C = function(e, t) {
        return function(n) {
          const a = Math.max(0, t - n.durationInSeconds - e);
          return Object(b.a)({}, n, {
            timeToStartInSeconds: a,
            timeToStart: T(a),
            active: a === 0,
          });
        };
      };
      const S = function(e) {
        return function(t) {
          return Object(b.a)({}, t, {
            timeToStartInSeconds: e - t.durationInSeconds,
            timeToStart: T(e - t.durationInSeconds),
          });
        };
      };
      const y = Object(f.a)(
        ((a = {}),
        Object(h.a)(a, 'TIMER_CREATE', function(e, t) {
          const n = Object(b.a)({}, t.payload, {
            durationInSeconds: E(t.payload.duration),
            active: !1,
            complete: !1,
          });
          const a = [].concat(Object(v.a)(e.get('timers')), [n]);
          const r = g(a);
          const i = Object(b.a)({}, n, {
            timeToStartInSeconds: r - E(t.payload.duration),
            timeToStart: T(r - E(t.payload.duration)),
          });
          const c = e.get('timers').map(S(r));
          const o = [].concat(Object(v.a)(c), [i]);
          return t.payload.duration === 0
            ? e
            : e
                .set('timers', o)
                .setIn(['superTimer', 'duration'], T(r))
                .setIn(['superTimer', 'durationInSeconds'], r);
        }),
        Object(h.a)(a, 'TIMER_DELETE', function(e, t) {
          if (!t.payload.length || e.getIn(['superTimer', 'active'])) return e;
          const n = Object(v.a)(
            e.get('timers').filter(function(e) {
              return e.id !== t.payload;
            }),
          );
          const a = g(n);
          const r = n.map(S(a));
          return e
            .set('timers', r)
            .setIn(['superTimer', 'durationInSeconds'], a)
            .setIn(['superTimer', 'duration'], T(a));
        }),
        Object(h.a)(a, 'TIMER_COMPLETE', function(e, t) {
          let n;
          const a = Object(v.a)(
            e.get('timers').map(
              ((n = t.payload),
              function(e) {
                return e.id !== n
                  ? e
                  : Object(b.a)({}, e, { complete: !0, active: !1 });
              }),
            ),
          );
          return e.set('timers', a);
        }),
        Object(h.a)(a, 'SUPER_TIMER_START', function(e) {
          return e.timers.length === 0
            ? e
            : (function(e) {
                const t = e.getIn(['superTimer', 'elapsedTime']);
                const n = e.get('timers');
                const a = e.getIn(['superTimer', 'durationInSeconds']);
                const r = n.map(C(t, a));
                return e.setIn(['superTimer', 'active'], !0).set('timers', r);
              })(e);
        }),
        Object(h.a)(a, 'SUPER_TIMER_TICK', function(e, t) {
          const n = t.payload;
          const a = e.getIn(['superTimer', 'durationInSeconds']) - n;
          const r = e.get('timers');
          const i = e.getIn(['superTimer', 'durationInSeconds']);
          const c = r.map(C(a, i));
          return e
            .setIn(['superTimer', 'currentCount'], n)
            .setIn(['superTimer', 'elapsedTime'], a)
            .set('timers', c);
        }),
        Object(h.a)(a, 'SUPER_TIMER_COMPLETE', function(e) {
          return e
            .setIn(['superTimer', 'complete'], !0)
            .setIn(['superTimer', 'active'], !1);
        }),
        a),
        j,
      );
      const I = Object(u.c)({ timers: y });
      const k = p()();
      const w = [m.a, Object(s.routerMiddleware)(k)];
      const R = u.d.apply(void 0, [u.a.apply(void 0, w)].concat([]));
      const M = Object(u.e)(Object(s.connectRouter)(k)(I), {}, R);
      const _ = n(538);
      const A = n(535);
      const P = n(24);
      const L = n(25);
      const x = n(27);
      const U = n(26);
      const W = n(28);
      const D = n(10);
      const B = n(98);
      const N = n(74);
      const F = n.n(N);
      const J = n(213);
      const K = n.n(J);
      const z = n(73);
      const H = n(146);
      const $ = n.n(H);
      const q = n(214);
      const G = n.n(q);
      const Q = n(215);
      const V = n.n(Q);
      const X = n(216);
      const Y = n.n(X);
      const Z = (function(e) {
        function t() {
          let e;
          let n;
          Object(P.a)(this, t);
          for (var a = arguments.length, r = new Array(a), i = 0; i < a; i++)
            r[i] = arguments[i];
          return (
            ((n = Object(x.a)(
              this,
              (e = Object(U.a)(t)).call.apply(e, [this].concat(r)),
            )).state = { value: r.value || '00:00:00' }),
            (n.onChange = n.onChange.bind(Object(D.a)(Object(D.a)(n)))),
            n
          );
        }
        return (
          Object(W.a)(t, e),
          Object(L.a)(t, [
            {
              key: 'componentWillReceiveProps',
              value(e) {
                const t = e.value;
                const n = this.state.value;
                void 0 !== t && t !== n && this.setState({ value: t });
              },
            },
            {
              key: 'onChange',
              value(e) {
                const t = this.state.value;
                const n = e.replace(/-/g, ':').padEnd(8, t.substr(5, 3));
                this.setState({ value: n });
              },
            },
            {
              key: 'render',
              value() {
                const e = this.state.value;
                const t = $()({
                  fontFamily: 'Arial',
                  palette: { primary1Color: z.yellow800 },
                  textField: { floatingLabelColor: '#666' },
                });
                const n = this.props.onChange;
                const a = void 0 === n ? this.onChange : n;
                return i.a.createElement(
                  'section',
                  { className: 'container' },
                  i.a.createElement(
                    G.a,
                    { muiTheme: t },
                    i.a.createElement(
                      'div',
                      { style: { marginRight: 20 } },
                      i.a.createElement(V.a, {
                        style: {
                          width: 25,
                          marginRight: 6,
                          marginBottom: -6,
                        },
                        color: '#bbb',
                      }),
                      i.a.createElement(K.a, {
                        showSeconds: !0,
                        value: e,
                        onChange: a,
                        style: { width: 82, fontSize: 20 },
                        input: i.a.createElement(Y.a, {
                          floatingLabelFixed: !0,
                          floatingLabelText: 'Time',
                        }),
                      }),
                    ),
                  ),
                );
              },
            },
          ]),
          t
        );
      })(i.a.Component);
      Object(h.a)(Z, 'defaultProps', { onChange: null, value: null });
      const ee = Z;
      const te = n(417);
      const ne = '00:00:00';
      const ae = (function(e) {
        function t(e) {
          let n;
          return (
            Object(P.a)(this, t),
            ((n = Object(x.a)(this, Object(U.a)(t).call(this, e))).state = {
              duration: ne,
            }),
            (n.handleTimeChange = n.handleTimeChange.bind(
              Object(D.a)(Object(D.a)(n)),
            )),
            (n.handleClick = n.handleClick.bind(Object(D.a)(Object(D.a)(n)))),
            n
          );
        }
        return (
          Object(W.a)(t, e),
          Object(L.a)(t, [
            {
              key: 'handleTimeChange',
              value(e) {
                this.setState({ duration: e });
              },
            },
            {
              key: 'handleClick',
              value() {
                const e = this.props;
                const t = e.createTimer;
                const n = e.name;
                const a = this.state.duration;
                a !== ne && t({ duration: a, id: te(), name: n });
              },
            },
            {
              key: 'render',
              value() {
                const e = this;
                const t = this.state.duration;
                return i.a.createElement(
                  'div',
                  null,
                  i.a.createElement(ee, {
                    value: t,
                    onChange: this.handleTimeChange,
                  }),
                  i.a.createElement(
                    F.a,
                    {
                      type: 'submit',
                      onClick() {
                        e.handleClick();
                      },
                    },
                    'Create timer',
                  ),
                );
              },
            },
          ]),
          t
        );
      })(r.Component);
      const re = n(537);
      const ie = function(e) {
        return Object(re.a)('TIMER_CREATE')(e);
      };
      const ce = function(e) {
        return Object(re.a)('TIMER_DELETE')(e);
      };
      const oe = function(e) {
        return Object(re.a)('TIMER_COMPLETE')(e);
      };
      const le = function(e) {
        return Object(re.a)('SUPER_TIMER_START')(e);
      };
      const ue = function(e) {
        return Object(re.a)('SUPER_TIMER_TICK')(e);
      };
      const se = function(e) {
        return Object(re.a)('SUPER_TIMER_COMPLETE')(e);
      };
      const me = Object(l.connect)(null, function(e) {
        return Object(u.b)({ createTimer: ie }, e);
      })(ae);
      const de = n(97);
      const pe = n.n(de);
      const he = n(61);
      const be = n.n(he);
      const ve = n(58);
      const fe = n.n(ve);
      const Oe = n(59);
      const je = n.n(Oe);
      const Ee = n(41);
      const Te = n.n(Ee);
      const ge = n(147);
      const Ce = n.n(ge);
      const Se = n(75);
      const ye = n.n(Se);
      const Ie = n(218);
      const ke = n.n(Ie);
      const we = function(e) {
        const t = e.active;
        const n = e.complete;
        const a = e.superTimerActive;
        const r = e.deleteTimer;
        const c = e.id;
        return t || n || a
          ? null
          : i.a.createElement(
              'div',
              null,
              i.a.createElement(
                Ce.a,
                null,
                i.a.createElement(
                  ye.a,
                  {
                    onClick() {
                      return r(c);
                    },
                  },
                  'Delete ',
                  i.a.createElement(ke.a, null),
                ),
              ),
            );
      };
      const Re = Object(l.connect)(null, function(e) {
        return Object(u.b)({ deleteTimer: ce }, e);
      })(we);
      const Me = (function(e) {
        function t(e) {
          let n;
          Object(P.a)(this, t);
          const a = (n = Object(x.a)(this, Object(U.a)(t).call(this, e))).props
            .timer.duration;
          return (
            (n.state = { duration: a }),
            (n.handleComplete = n.handleComplete.bind(
              Object(D.a)(Object(D.a)(n)),
            )),
            n
          );
        }
        return (
          Object(W.a)(t, e),
          Object(L.a)(t, [
            {
              key: 'shouldComponentUpdate',
              value(e) {
                const t = this.props.timer;
                const n = t.timeToStart;
                const a = t.active;
                const r = e.timer;
                const i = r.timeToStart;
                return r.active !== a || i !== n;
              },
            },
            {
              key: 'handleComplete',
              value() {
                const e = this.props;
                (0, e.completeTimer)(e.timer.id);
              },
            },
            {
              key: 'render',
              value() {
                const e = this.props;
                const t = e.timer;
                const n = t.name;
                const a = t.active;
                const r = t.timeToStart;
                const c = t.id;
                const o = t.complete;
                const l = e.superTimerActive;
                const u = this.state.duration;
                return i.a.createElement(
                  fe.a,
                  null,
                  i.a.createElement(
                    je.a,
                    null,
                    i.a.createElement(
                      Te.a,
                      { color: 'textSecondary', gutterBottom: !0 },
                      'Timer',
                    ),
                    i.a.createElement(Te.a, null, n),
                    a &&
                      i.a.createElement(pe.a, {
                        date: be()()
                          .add(be.a.duration(u))
                          .toDate(),
                        onComplete: this.handleComplete,
                      }),
                    !a &&
                      !o &&
                      i.a.createElement('p', null, u, ', Time to start: ', r),
                    o && i.a.createElement('p', null, 'Done!'),
                  ),
                  i.a.createElement(Re, {
                    superTimerActive: l,
                    active: a,
                    id: c,
                    complete: o,
                  }),
                );
              },
            },
          ]),
          t
        );
      })(r.Component);
      const _e = Object(l.connect)(
        function(e) {
          return { superTimerActive: e.timers.superTimer.active };
        },
        function(e) {
          return Object(u.b)({ completeTimer: oe }, e);
        },
      )(Me);
      const Ae = n(94);
      const Pe = n.n(Ae);
      const Le = (function(e) {
        function t(e) {
          let n;
          return (
            Object(P.a)(this, t),
            ((n = Object(x.a)(
              this,
              Object(U.a)(t).call(this, e),
            )).handleSubmitClick = n.handleSubmitClick.bind(
              Object(D.a)(Object(D.a)(n)),
            )),
            (n.handleTick = n.handleTick.bind(Object(D.a)(Object(D.a)(n)))),
            (n.handleComplete = n.handleComplete.bind(
              Object(D.a)(Object(D.a)(n)),
            )),
            n
          );
        }
        return (
          Object(W.a)(t, e),
          Object(L.a)(t, [
            {
              key: 'shouldComponentUpdate',
              value(e) {
                const t = this.props.superTimer;
                const n = t.duration;
                const a = t.active;
                return e.superTimer.duration !== n || e.superTimer.active !== a;
              },
            },
            {
              key: 'handleSubmitClick',
              value() {
                const e = this.props;
                const t = e.startSuperTimer;
                e.superTimer.duration !== '00:00:00' && t();
              },
            },
            {
              key: 'handleTick',
              value(e) {
                const t = e.total;
                (0, this.props.tickSuperTimer)(t / 1e3);
              },
            },
            {
              key: 'handleComplete',
              value() {
                (0, this.props.completeSuperTimer)();
              },
            },
            {
              key: 'render',
              value() {
                const e = this;
                const t = this.props.superTimer;
                const n = t.duration;
                const a = t.active;
                const r = t.complete;
                return i.a.createElement(
                  fe.a,
                  null,
                  i.a.createElement(
                    je.a,
                    null,
                    i.a.createElement(
                      Te.a,
                      { color: 'textSecondary', gutterBottom: !0 },
                      'Total: ',
                      n,
                    ),
                    a &&
                      i.a.createElement(pe.a, {
                        date: be()()
                          .add(be.a.duration(n))
                          .toDate(),
                        dayInHours: !0,
                        onTick: this.handleTick,
                        onComplete: this.handleComplete,
                      }),
                    r && i.a.createElement('p', null, 'All done!'),
                  ),
                  (!a || !r) &&
                    i.a.createElement(
                      Pe.a,
                      null,
                      i.a.createElement(
                        ye.a,
                        {
                          disabled: n === '00:00:00',
                          type: 'submit',
                          variant: 'contained',
                          color: 'primary',
                          onClick() {
                            e.handleSubmitClick();
                          },
                        },
                        'Start',
                      ),
                    ),
                );
              },
            },
          ]),
          t
        );
      })(r.Component);
      const xe = Object(l.connect)(
        function(e) {
          return { superTimer: e.timers.superTimer };
        },
        function(e) {
          return Object(u.b)(
            {
              startSuperTimer: le,
              tickSuperTimer: ue,
              completeSuperTimer: se,
            },
            e,
          );
        },
      )(Le);
      const Ue = function(e) {
        const t = e.timers;
        return i.a.createElement(
          'div',
          null,
          t.map(function(e) {
            return i.a.createElement(_e, { key: e.id, timer: e });
          }),
          i.a.createElement(xe, null),
        );
      };
      const We = Object(l.connect)(function(e) {
        return { timers: e.timers.timers };
      }, null)(Ue);
      const De = (function(e) {
        function t(e) {
          let n;
          return (
            Object(P.a)(this, t),
            ((n = Object(x.a)(
              this,
              Object(U.a)(t).call(this, e),
            )).handleChange = n.handleChange.bind(Object(D.a)(Object(D.a)(n)))),
            (n.state = { name: '' }),
            n
          );
        }
        return (
          Object(W.a)(t, e),
          Object(L.a)(t, [
            {
              key: 'handleChange',
              value(e) {
                const t = this;
                return function(n) {
                  t.setState(Object(h.a)({}, e, n.target.value));
                };
              },
            },
            {
              key: 'render',
              value() {
                const e = this.state.name;
                return i.a.createElement(
                  'div',
                  null,
                  i.a.createElement(B.a, {
                    id: 'item-name',
                    label: 'Name',
                    value: this.name,
                    onChange: this.handleChange('name'),
                    margin: 'normal',
                  }),
                  i.a.createElement(me, { name: e }),
                  i.a.createElement(We, null),
                );
              },
            },
          ]),
          t
        );
      })(i.a.Component);
      const Be = Object(l.connect)(function(e) {
        return { timers: e.timers.timers };
      }, null)(De);
      const Ne = (function(e) {
        function t(e) {
          let n;
          return (
            Object(P.a)(this, t),
            ((n = Object(x.a)(
              this,
              Object(U.a)(t).call(this, e),
            )).handleChange = n.handleChange.bind(Object(D.a)(Object(D.a)(n)))),
            (n.state = { name: '' }),
            n
          );
        }
        return (
          Object(W.a)(t, e),
          Object(L.a)(t, [
            {
              key: 'handleChange',
              value(e) {
                const t = this;
                return function(n) {
                  t.setState(Object(h.a)({}, e, n.target.value));
                };
              },
            },
            {
              key: 'render',
              value() {
                const e = this.state.name;
                return i.a.createElement(
                  'div',
                  null,
                  i.a.createElement(B.a, {
                    id: 'item-name',
                    label: 'Name',
                    value: this.name,
                    onChange: this.handleChange('name'),
                    margin: 'normal',
                  }),
                  i.a.createElement(me, { name: e }),
                  i.a.createElement(We, null),
                );
              },
            },
          ]),
          t
        );
      })(i.a.Component);
      const Fe = function() {
        return i.a.createElement(
          _.a,
          null,
          i.a.createElement(
            'div',
            null,
            i.a.createElement(A.a, { path: '/', exact: !0, component: Be }),
            i.a.createElement(A.a, {
              path: '/add-item',
              exact: !0,
              component: Ne,
            }),
          ),
        );
      };
      const Je = Object(l.connect)(null, null)(Fe);
      const Ke = function() {
        return i.a.createElement(Je, null);
      };
      const ze = Object(l.connect)(null, null)(Ke);
      const He = function() {
        return i.a.createElement(
          l.Provider,
          { store: M },
          i.a.createElement(ze, null),
        );
      };
      function $e(e, t) {
        navigator.serviceWorker
          .register(e)
          .then(function(e) {
            e.onupdatefound = function() {
              const n = e.installing;
              n != null &&
                (n.onstatechange = function() {
                  n.state === 'installed' &&
                    (navigator.serviceWorker.controller
                      ? (console.log(
                          'New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA.',
                        ),
                        t && t.onUpdate && t.onUpdate(e))
                      : (console.log('Content is cached for offline use.'),
                        t && t.onSuccess && t.onSuccess(e)));
                });
            };
          })
          .catch(function(e) {
            console.error('Error during service worker registration:', e);
          });
      }
      const qe = Boolean(
        window.location.hostname === 'localhost' ||
          window.location.hostname === '[::1]' ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
          ),
      );
      function Ge(e) {
        if ('serviceWorker' in navigator) {
          if (
            new URL('.', window.location.href).origin !== window.location.origin
          )
            return;
          window.addEventListener('load', function() {
            const t = ''.concat('.', '/service-worker.js');
            qe
              ? (!(function(e, t) {
                  fetch(e)
                    .then(function(n) {
                      const a = n.headers.get('content-type');
                      n.status === 404 ||
                      (a != null && a.indexOf('javascript') === -1)
                        ? navigator.serviceWorker.ready.then(function(e) {
                            e.unregister().then(function() {
                              window.location.reload();
                            });
                          })
                        : $e(e, t);
                    })
                    .catch(function() {
                      console.log(
                        'No internet connection found. App is running in offline mode.',
                      );
                    });
                })(t, e),
                navigator.serviceWorker.ready.then(function() {
                  console.log(
                    'This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA',
                  );
                }))
              : $e(t, e);
          });
        }
      }
      const Qe = function() {
        Ge(),
          o.a.render(
            i.a.createElement(He, null),
            document.getElementById('root'),
          );
      };
      window.cordova ? document.addEventListener('deviceready', Qe, !1) : Qe();
    },
  },
  [[299, 2, 1]],
]);
// # sourceMappingURL=main.4a7fef7e.chunk.js.map
