from datetime import *
import json


CURRENT_YEAR = 2023
CURRENT_READ_FILE = "parameters/dofus/almanax_2023_data.txt"


class Offering:
    def __init__(self, day: date, meridia_image: str, meridia_name: str, bonus_name: str, bonus_description: str, resource_name: str, resource_image: str, resource_number: str, kamas_given: str) -> None:
        self._day: date = day
        self._meridia_image: str = meridia_image
        self._meridia_name: str = meridia_name
        self._bonus_name: str = bonus_name
        self._bonus_description: str = bonus_description
        self._resource_name: str = resource_name
        self._resource_image: str = resource_image
        self._resource_number: str = resource_number
        self._kamas_given: int = kamas_given

    @property
    def day(self) -> date:
        return self._day

    @day.setter
    def day(self, value: date) -> None:
        self._day = value

    @day.deleter
    def day(self) -> None:
        del self._day

    @property
    def meridia_image(self) -> str:
        return self._meridia_image

    @meridia_image.setter
    def meridia_image(self, value: str) -> None:
        self._meridia_image = value

    @meridia_image.deleter
    def meridia_image(self) -> None:
        del self._meridia_image

    @property
    def meridia_name(self) -> str:
        return self._meridia_name

    @meridia_name.setter
    def meridia_name(self, value: str) -> None:
        self._meridia_name = value

    @meridia_name.deleter
    def meridia_name(self) -> None:
        del self._meridia_name

    @property
    def bonus_name(self) -> str:
        return self._bonus_name

    @bonus_name.setter
    def bonus_name(self, value: str) -> None:
        self._bonus_name = value

    @bonus_name.deleter
    def bonus_name(self) -> None:
        del self._bonus_name

    @property
    def bonus_description(self) -> str:
        return self._bonus_description

    @bonus_description.setter
    def bonus_description(self, value: str) -> None:
        self._bonus_description = value

    @bonus_description.deleter
    def bonus_description(self) -> None:
        del self._bonus_description

    @property
    def resource_name(self) -> str:
        return self._resource_name

    @resource_name.setter
    def resource_name(self, value: str) -> None:
        self._resource_name = value

    @resource_name.deleter
    def resource_name(self) -> None:
        del self._resource_name

    @property
    def resource_image(self) -> str:
        return self._resource_image

    @resource_image.setter
    def resource_image(self, value: str) -> None:
        self._resource_image = value

    @resource_image.deleter
    def resource_image(self) -> None:
        del self._resource_image

    @property
    def resource_number(self) -> str:
        return self._resource_number

    @resource_number.setter
    def resource_number(self, value: str) -> None:
        self._resource_number = value

    @resource_number.deleter
    def resource_number(self) -> None:
        del self._resource_number

    @property
    def kamas_given(self) -> int:
        return self._kamas_given

    @kamas_given.setter
    def kamas_given(self, value: int) -> None:
        self._kamas_given = value

    @kamas_given.deleter
    def kamas_given(self)-> None:
        del self._kamas_given

    def compute_json(self) -> dict[str, any]:
        return {
            "date": self.day.isoformat(),
            "meridia": {
                "name": self.meridia_name,
                "image": self.meridia_image
            },
            "resource": {
                "name": self.resource_name,
                "image": self.resource_image,
                "number": self.resource_number
            },
            "kamas": self.kamas_given,
            "bonus": {
                "name": self.bonus_name,
                "description": self.bonus_description
            }
        }


def main():
    offerings: list[Offering] = []
    current_day: date = date(CURRENT_YEAR, 1, 1)

    with open(CURRENT_READ_FILE) as raw_data:
        for raw_line in raw_data:
            offering_details: list[str] = raw_line.split('\t')

            offering = Offering(
                current_day,
                offering_details[0],
                offering_details[1],
                offering_details[2].removeprefix('Bonus : '),
                offering_details[6],
                offering_details[4],
                offering_details[3],
                offering_details[5],
                int(offering_details[7])
            )

            offerings.append(offering)

            current_day = current_day.__add__(timedelta(1))

    json_data = json.dumps([offering.compute_json() for offering in offerings], indent=4, ensure_ascii=False).encode('utf-8')

    with open("parameters/dofus/almanaxData.json", "w") as almanax_json:
        almanax_json.write(json_data.decode())


main()