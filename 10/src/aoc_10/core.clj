(ns aoc-10.core
  (:require [clojure.string :as str])
  (:gen-class))

(def monitor-width 40)

(defn parse-instruction [s]
  (if (= s "noop")
    [identity]
    [identity (partial + (-> s (str/split #" ") last parse-long))]))

(defn cycle-count [input]
  (->> (str/split-lines input)
       (mapcat parse-instruction)
       (reductions #(%2 %1) 1)
       vec))

(defn part1 [input]
  (let [signals (cycle-count input)]
    (transduce (map (fn [offset] (* offset (signals (dec offset))))) + [20 60 100 140 180 220])))

(defn print-character [crt-cycle signal]
  (if (<= (abs (- crt-cycle signal)) 1) \x \space))

(defn part2 [input]
  (->> (map print-character (cycle-count input) (cycle (range monitor-width)))
       (partition monitor-width)
       (map (partial apply str))
       (run! println)))

(defn -main []
  (let [filename "input.txt"
        input (slurp filename)
        ]
    (part1 input)
    ;; (part2 input)
    ))