const countRawQueries = {
  perGame: `SELECT COUNT (*) FROM 
(SELECT COUNT (*) FROM streams.streams 
GROUP BY game_id) AS streamspergame;`,
  highestViewers: `SELECT COUNT(*) FROM
(SELECT game_name, title, temp.viewer_count FROM streams.streams temp INNER JOIN
(SELECT game_id, MAX(viewer_count) as viewer_count FROM streams.streams group by game_id) AS lookup
ON lookup.game_id = temp.game_id AND lookup.viewer_count = temp.viewer_count) AS record_count;`,
  evenViewers: `SELECT COUNT(*) FROM streams.streams WHERE viewer_count % 2 = 0`,
  oddViewers: `SELECT COUNT(*) FROM streams.streams WHERE viewer_count % 2 <> 0`,
  sameViewers: `SELECT COUNT(*) FROM
(SELECT DISTINCT temp.game_name, temp.title AS stream_title, temp.viewer_count FROM streams.streams AS temp INNER JOIN
  (SELECT id, viewer_count, title FROM streams.streams) AS lookup
  ON lookup.id <> temp.id AND lookup.viewer_count = temp.viewer_count) AS record_count;`,
};

const selectRawQueries = {
  perGame: (
    limit,
    offset
  ) => `SELECT game_name, COUNT(*) as stream_count FROM streams.streams
  GROUP BY game_id, game_name
  limit ${limit} offset ${offset}`,
  highestViewers: (
    limit,
    offset
  ) => `SELECT game_name, title, temp.viewer_count FROM streams.streams temp INNER JOIN
  (SELECT game_id, MAX(viewer_count) as viewer_count FROM streams.streams group by game_id) AS lookup
  ON lookup.game_id = temp.game_id AND lookup.viewer_count = temp.viewer_count
  limit ${limit} offset ${offset}`,
  evenViewers: (
    limit,
    offset
  ) => `SELECT title, game_name, viewer_count FROM streams.streams WHERE viewer_count % 2 = 0
  limit ${limit} offset ${offset}`,
  oddViewers: (
    limit,
    offset
  ) => `SELECT title, game_name, viewer_count FROM streams.streams WHERE viewer_count % 2 = 0
  limit ${limit} offset ${offset}`,
  sameViewers: (
    limit,
    offset
  ) => `SELECT DISTINCT temp.game_name, temp.title AS stream_title, temp.viewer_count FROM streams.streams AS temp INNER JOIN
  (SELECT id, viewer_count, title FROM streams.streams) AS lookup
  ON lookup.id <> temp.id AND lookup.viewer_count = temp.viewer_count ORDER BY temp.viewer_count DESC
  limit ${limit} offset ${offset}`,
};

module.exports.countRawQueries = countRawQueries;
module.exports.selectRawQueries = selectRawQueries;
