use std::fs;

mod instructions;
mod part1;
mod part2;

// const FILE_PATH: &str = "test";
// const FILE_PATH: &str = "test2";
const FILE_PATH: &str = "input";

fn parse_file() -> Vec<instructions::Instruction> {
    let contents: String = fs::read_to_string(FILE_PATH).expect("Failed to read input file");
    let lines = contents.split("\n").collect::<Vec<&str>>();
    let instructions = lines
        .iter()
        .map(|line| {
            let values = line
                .split(" ")
                .map(|s| s.to_string())
                .collect::<Vec<String>>();
            let moves = values[1].parse::<i32>().unwrap();
            return instructions::Instruction {
                direction: values[0].clone(),
                moves: moves,
            };
        })
        .collect::<Vec<instructions::Instruction>>();
    return instructions;
}

fn main() {
    let instructions = parse_file();
    // println!("{:?}", instructions);
    // part1::perform_instructions(&instructions);
    part2::perform_instructions(&instructions);
}
