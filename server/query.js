exports.create_task =
  'INSERT INTO public.tasks(value, result, character_nickname, created) VALUES ($1, $2, $3, $4)'

exports.create_bot =
  'INSERT INTO public.bot( nickname, lvl, hp, current_hp, str, vit, dex, acc, dmg, date, attacker_nickname, diff) VALUES ($1, 1, 1, 1, 1, 1, 1, 1, 1, 1, $2, 1);'

exports.create_character =
  'INSERT INTO public.character( nickname, exp, lvl, hp, current_hp, str, vit, dex, acc, dmg, current_exp, free_stats, bosses_defeated, time, password) VALUES ($1, 100, 1, 80, 80, 7, 7, 7, 7, 30, 0, 5, 0, 10, $2);'

exports.create_item =
  'INSERT INTO public.items( character_name, url, type, name, set_name, lvl, rar, is_weared, hp, str, dex, vit, acc, dmg, "time") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);'

exports.set_character =
  'UPDATE public.character SET lvl =$1, free_stats = $2, current_hp = $3, exp = $4, current_exp = $5, dmg = $6 WHERE nickname = $7;'

exports.set_bot =
  'UPDATE public.bot SET nickname=$1, lvl=$2, hp=$3, current_hp=$4, str=$5, vit=$6, dex=$7, acc=$8, dmg=$9, date=$10, diff=$11 WHERE attacker_nickname = $12;'

exports.set_bot_hp =
  'UPDATE public.bot SET current_hp = ($1) WHERE attacker_nickname = ($2);'

exports.set_hp_exp =
  'UPDATE public.character SET current_hp = ($1), current_exp = ($2), free_stats = ($3) WHERE nickname = ($4);'

exports.set_str =
  'UPDATE public.character SET str = str + 1, free_stats = free_stats - 1 WHERE nickname = ($1);'

exports.set_vit =
  'UPDATE public.character SET vit = vit + 1, free_stats = free_stats - 1, hp = hp + 4, current_hp = current_hp + 4  WHERE nickname = ($1);'

exports.set_dex =
  'UPDATE public.character SET dex = dex + 1, free_stats = free_stats - 1 WHERE nickname = ($1);'

exports.set_acc =
  'UPDATE public.character SET acc = acc + 1, free_stats = free_stats - 1 WHERE nickname = ($1);'

exports.set_fullhp =
  'UPDATE public.character SET current_hp = hp WHERE nickname = ($1);'

exports.set_wear_item =
  'UPDATE public.items SET is_weared = ($2) WHERE id = ($1);'

exports.get_stat =
  'SELECT free_stats FROM public.character WHERE nickname = ($1);'

exports.get_items =
  'SELECT * FROM public.items WHERE character_name = ($1) ORDER BY id ASC;'

exports.get_char_info = 'SELECT nickname, exp, lvl, hp, current_hp, str, vit, dex, acc, dmg, current_exp, free_stats, bosses_defeated, time FROM public.character WHERE nickname = ($1);'

exports.get_bot_info =
  'SELECT * FROM public.bot WHERE attacker_nickname = ($1);'

exports.get_task =
  'SELECT result, created FROM public.tasks WHERE character_nickname = ($1) ORDER BY created DESC LIMIT 1;'

exports.get_current_bot_info =
  'SELECT * FROM public.bot WHERE attacker_nickname = ($1) ORDER BY date DESC LIMIT 1;'

exports.get_result =
  'SELECT result, created FROM public.tasks WHERE character_nickname = ($1) ORDER BY created DESC LIMIT 1;'

exports.get_wearing_items =
  'SELECT * FROM public.items WHERE character_name = $1 AND is_weared = $2;'

exports.check_character =
  'SELECT COUNT(nickname) FROM public.character WHERE nickname = $1;'

exports.check_auth =
  'SELECT COUNT(nickname) FROM public.character WHERE nickname = $1 AND password = $2;'
