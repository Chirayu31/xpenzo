import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AddSplitsSchema,
  AddTransactionModalSchema,
} from "@/validation/transactions";
import { FC, memo, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

interface SplitTransactionFormProps {
  form: UseFormReturn<z.infer<typeof AddTransactionModalSchema>>;
  splitData: z.infer<typeof AddSplitsSchema> | undefined;
  setSplitData: React.Dispatch<
    React.SetStateAction<z.infer<typeof AddSplitsSchema> | undefined>
  >;
}

const mockGroups = [
  { id: 1, name: "Group 1" },
  { id: 2, name: "Group 2" },
  { id: 3, name: "Group 3" },
  { id: 4, name: "Group 4" },
];

interface Member {
  id: number;
  name: string;
  groupId: number;
  splitAmount?: number;
}

interface ValueSplitListProps {
  selectedMembers: Member[];
  amount: number;
  onSplitAmountChange: (memberId: number, value: string) => void;
}

const mockMembers: Member[] = [
  { id: 1, name: "Member 1", groupId: 1 },
  { id: 2, name: "Member 2", groupId: 2 },
  { id: 3, name: "Member 3", groupId: 2 },
  { id: 4, name: "Member 4", groupId: 4 },
];

const TransactionSplitForm: FC<SplitTransactionFormProps> = ({
  form,
  splitData,
  setSplitData,
}) => {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [splitType, setSplitType] = useState<"equal" | "value">("equal");
  const group_id = form.watch("group_id");
  const amount = form.watch("amount");

  useEffect(() => {
    if (group_id) {
      const groupMembers = mockMembers.filter(
        (member) => member.groupId === parseInt(group_id.toString())
      );

      const splitData = groupMembers.map((member) => ({
        userId: member.id,
        amount: amount ? amount / groupMembers.length : 0,
      }));

      setSplitData({ splits: splitData });
      setSelectedMembers(
        groupMembers.map((member) => ({
          ...member,
          amount: amount ? amount / groupMembers.length : 0,
        }))
      );
    } else {
      setSelectedMembers([]);
    }
  }, [group_id, amount, setSplitData]);

  useEffect(() => {
    if (selectedMembers.length > 0 && amount && splitType === "equal") {
      const splitAmount = amount / selectedMembers.length;

      const updatedMembers = selectedMembers.map((member) => ({
        ...member,
        splitAmount,
      }));

      const hasChanged = updatedMembers.some(
        (updatedMember, index) =>
          updatedMember.splitAmount !== selectedMembers[index].splitAmount
      );

      if (hasChanged) {
        const splitData = updatedMembers.map((member) => ({
          userId: member.id,
          amount: member.splitAmount,
        }));
        setSplitData({ splits: splitData });
        setSelectedMembers(updatedMembers);
      }
    }
  }, [amount, selectedMembers, setSplitData, splitType]);

  const handleMemberSelect = (memberId: string) => {
    const member = mockMembers.find((m) => m.id.toString() === memberId);

    if (member) {
      if (selectedMembers.some((m) => m.id === member.id)) {
        const updatedMembers = selectedMembers.filter(
          (m) => m.id !== member.id
        );
        setSelectedMembers(updatedMembers);
      } else {
        const newSelectedMembers = [...selectedMembers, member];
        setSelectedMembers(newSelectedMembers);
      }
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="group_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Group</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger id="group" {...field}>
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {mockGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id.toString()}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {group_id && (
        <Tabs defaultValue="equal" className="w-[300px] sm:w-[400px]">
          <TabsList>
            <TabsTrigger value="equal" onClick={() => setSplitType("equal")}>
              Equally
            </TabsTrigger>
            <TabsTrigger value="value" onClick={() => setSplitType("value")}>
              By Value
            </TabsTrigger>
          </TabsList>
          <TabsContent value="equal">
            {selectedMembers.map((member, index) => (
              <Badge key={index} className="mr-2">
                {member.name} - {member.splitAmount}
              </Badge>
            ))}

            <Select onValueChange={handleMemberSelect}>
              <SelectTrigger id="members" className="mt-2" disabled={!group_id}>
                <SelectValue placeholder="Select members" />
              </SelectTrigger>
              <SelectContent>
                {mockMembers
                  .filter(
                    (member) =>
                      member.groupId ===
                      (group_id ? parseInt(group_id.toString()) : 0)
                  )
                  .map((member) => (
                    <SelectPrimitive.Item
                      className={cn(
                        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      )}
                      key={member.id}
                      value={member.id.toString()}
                    >
                      <span className="flex items-center gap-2">
                        {selectedMembers.some((m) => m.id === member.id) && (
                          <Check className="h-4 w-4" />
                        )}
                        {member.name}
                      </span>
                    </SelectPrimitive.Item>
                  ))}
              </SelectContent>
            </Select>
          </TabsContent>

          <TabsContent value="value">
            <ValueSplitList
              selectedMembers={selectedMembers}
              amount={amount}
              onSplitAmountChange={(memberId, value) => {
                const updatedMembers = selectedMembers.map((member) =>
                  member.id === memberId
                    ? { ...member, splitAmount: parseFloat(value) || 0 }
                    : member
                );
                setSelectedMembers(updatedMembers);
              }}
            />
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};

const ValueSplitList: FC<ValueSplitListProps> = memo(
  ({ selectedMembers, amount, onSplitAmountChange }) => {
    const totalSplitAmount = selectedMembers.reduce(
      (sum, member) => sum + (member.splitAmount || 0),
      0
    );

    return (
      <>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 justify-center">
          {selectedMembers.map((member) => (
            <div key={member.id} className="flex items-center">
              <p className="w-24 text-sm">{member.name}</p>
              <Input
                type="number"
                placeholder="Amount"
                className="w-24"
                value={member.splitAmount || ""}
                onChange={(e) => onSplitAmountChange(member.id, e.target.value)}
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Total amount: Rs. {totalSplitAmount.toFixed(2)}{" "}
          {amount ? `(should equal to Rs. ${amount})` : ""}
        </p>
      </>
    );
  }
);
ValueSplitList.displayName = "ValueSplitList";

export default TransactionSplitForm;
