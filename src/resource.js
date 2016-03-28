var rp = "res/"; // resource prefix

var res = {
    HelloWorld_png: rp + "HelloWorld.png",
    arena_png: rp + "arena.png",
    player1_png: rp + "player1.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
