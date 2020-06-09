!function(e, i) {
  if (!e.pixie) {
    var n = e.pixie = function(e, i, a) {
      n.actionQueue.push({ action: e, actionValue: i, params: a })
    }
    n.actionQueue = []
    var a = i.createElement("script")
    a.async = !0, a.src = "//acdn.adnxs.com/dmp/up/pixie.js"
    var t = i.getElementsByTagName("head")[0]
    t.insertBefore(a, t.firstChild)
  }
}(window, document)
pixie("init", "80eb57ca-a8f6-4e55-ad0d-72405e8ec786")
pixie("event", "PageView")

