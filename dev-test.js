const Block = require("./block");

const gBlock = Block.genesis();
console.log(gBlock.toString());

var fooBlock = Block.mineBlock(gBlock, "foo");
console.log(fooBlock.toString());

var barBlock = Block.mineBlock(fooBlock, "bar");
console.log(barBlock.toString());
