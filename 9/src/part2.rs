use crate::instructions;

use std::collections::HashSet;

pub fn perform_instructions(instructions: &Vec<instructions::Instruction>) {
    let mut knot_positions: Vec<(i32, i32)> = [
        (0, 0), // H
        (0, 0), // 1
        (0, 0), // 2
        (0, 0), // 3
        (0, 0), // 4
        (0, 0), // 5
        (0, 0), // 6
        (0, 0), // 7
        (0, 0), // 8
        (0, 0), // 9
    ]
    .to_vec();
    let mut tail_visited_positions: HashSet<String> = HashSet::new();

    for instruction in instructions {
        for _i in 0..instruction.moves {
            for j in 0..knot_positions.len() {
                let is_head = j == 0;
                let is_tail = j == knot_positions.len() - 1;

                if is_head {
                    let head_move = move_by_direction(&instruction.direction);
                    knot_positions[0].0 += head_move.0;
                    knot_positions[0].1 += head_move.1;
                } else {
                    knot_positions[j] =
                        calculate_tail_position(knot_positions[j - 1], knot_positions[j]);
                }

                if is_tail {
                    let tail_key = format!("{},{}", knot_positions[j].0, knot_positions[j].1);
                    tail_visited_positions.insert(tail_key);
                }
            }
        }
    }

    println!("Tail visited positions - {}", tail_visited_positions.len());
}

/**
* Calculate the updated tail position by the head & tail's current position
*/
fn calculate_tail_position(head_pos: (i32, i32), tail_pos: (i32, i32)) -> (i32, i32) {
    let x_diff = head_pos.0 - tail_pos.0;
    let y_diff = head_pos.1 - tail_pos.1;

    // No change
    if x_diff.abs() <= 1 && y_diff.abs() <= 1 {
        return tail_pos;
    }

    // Horizontal update needed
    if x_diff.abs() > 1 && y_diff == 0 {
        let direction = if x_diff > 0 { 1 } else { -1 };
        return (tail_pos.0 + direction, tail_pos.1);
    }

    // Vertical update needed
    if x_diff == 0 && y_diff.abs() > 1 {
        let direction = if y_diff > 0 { 1 } else { -1 };
        return (tail_pos.0, tail_pos.1 + direction);
    }

    // Diagonal update needed
    let x_dir = if x_diff > 0 { 1 } else { -1 };
    let y_dir = if y_diff > 0 { 1 } else { -1 };

    return (tail_pos.0 + x_dir, tail_pos.1 + y_dir);
}

fn move_by_direction(direction: &str) -> (i32, i32) {
    match direction {
        "R" => return (1, 0),
        "L" => return (-1, 0),
        "U" => return (0, -1),
        "D" => return (0, 1),
        _ => return (0, 0),
    }
}
