import path from "path";
const packageJsonPath = path.resolve(import.meta.dir, "..", "package.json");
const packageJson = Bun.file(packageJsonPath)
const contents  = await packageJson.json<{scripts: any}>();

console.log(contents);

if(contents.scripts) {
  contents.scripts.file = "bun run src/files.ts"
} 

Bun.write(packageJsonPath, JSON.stringify(contents, null, 2))
const {
  path: metaPath, dir, main, file: metaFile, url
} = import.meta

console.log({
  metaPath,dir,main,metaFile, url
})

const txt = `${import.meta.dir}/test.txt`
console.log(txt)

// open writer
const file = Bun.file(txt)
const writer = file.writer();
// write some stuff
writer.write("Something \n")
// do some stuff
console.log("Still writing");
// write some more stuff
writer.write("Something  else \n")
console.log("Wrote some more stuff");
console.log("Finishing...");
// flush writer
writer.flush();
// close
writer.end();


Bun.write(Bun.stdout, "Some content to stdout");
